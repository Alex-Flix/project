const mongoose = require("mongoose");
const cloudinary = require("../Middlewares/services/cloudinary");

const Product = mongoose.model("products");
const Movie = mongoose.model("movies");

exports.getAllProducts = async function (request, response, next) {
  try {
    let page = request.query.page;
    page = page * 1 || 1;
    if (page <= 0 || !page) page = 1;
    let limit = 5; // display only 16 products for each page
    let skip = (page - 1) * limit;
    const allProducts = await Product.find({}, { __v: 0 })
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit);
    if (allProducts.length == 0) throw new Error("No Products exist");
    response.status(200).json({ page, allProducts });
  } catch (error) {
    next(error);
  }
};

// Create a new product
exports.createProduct = async (request, response, next) => {
  try {
    const { name, price, description, available, category } = request.body;

    const images = [];
    for (const { path } of request.files) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(path, {
        folder: "products/images",
      });
      images.push({ secure_url, public_id });
    }
    const product = new Product({
      name,
      price,
      description,
      images,
      available,
      category,
    });

    // Save the product to the database
    const newProduct = await product.save();
    response.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

exports.searchProduct = async function (request, response, next) {
  try {
    // No query params
    if (Object.keys(request.query).length === 0) throw new Error("Not Exist");

    const query = {};
    for (const key in request.query) {
      if (request.query[key]) query[key] = request.query[key];

      // if request has name parameter
      if (key === "name" || key === "movie")
        query[key] = { $regex: request.query[key], $options: "i" };

      if (key === "minPrice" && query[key]) {
        query.price = { ...query.price, $gte: +query[key] };
        delete query[key];
        // query.price = { $gte: +minPrice}
      }
      if (key === "maxPrice" && query[key]) {
        query.price = { ...query.price, $lte: +query[key] };
        delete query[key];
      }
      if (key === "available")
        // Search By 1 for Availability and 0  for all .
        +query[key] ? (query.available = { $gte: 1 }) : delete query[key];

      // a query to find the price range
      // query.price = { $gte: +minPrice, $lte: +maxPrice}
    }
    const { movie } = query;
    delete query.movie;
    // Check if relatedMovieName is provided and find products related to this movie
    if (movie) {
      const relatedMovie = await Movie.aggregate([
        { $match: { name: movie } },
        {
          $lookup: {
            from: "products",
            localField: "products",
            foreignField: "_id",
            as: "relatedProducts",
          },
        },
        { $project: { relatedProducts: 1, _id: 0 } },
        { $unwind: "$relatedProducts" },
        { $replaceRoot: { newRoot: "$relatedProducts" } },
        {
          $group: {
            _id: null,
            products: { $addToSet: "$$ROOT" },
          },
        },
        { $project: { _id: 0 } },
        { $unwind: "$products" },
        { $replaceRoot: { newRoot: "$products" } },
        { $match: query },
      ]);
      if (!relatedMovie.length) throw new Error("No Product exist");

      response.status(200).json(relatedMovie);
    } else {
      const products = await Product.find(query);
      if (products.length == 0) throw new Error("No Product exist");
      response.status(200).json(products);
    }
  } catch (error) {
    next(error);
  }
};

exports.updateProductById = async function (request, response, next) {
  try {
    let newProduct = {};
    for (prop in request.body) {
      newProduct[prop] = request.body[prop];
    }

    let product = await Product.findByIdAndUpdate(
      request.params.id,
      newProduct,
      {
        new: true,
      }
    );

    if (!product) throw new Error("No product exist by this ID");

    response.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async function (request, response, next) {
  try {
    const product = await Product.findById(request.params.id, { __v: 0 }); // try it with req.params
    if (!product) throw new Error("No Product exist by this id");
    response.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.deleteProductById = async function (request, response, next) {
  try {
    // Remove Product from Products Collection
    const product = await Product.findByIdAndDelete(request.params.id); // try it with req.params
    if (!product) throw new Error("No Product exist by this id");
    // Remove Product from Movie Collection
    const movie = await Movie.updateMany(
      { products: product._id },
      { $pull: { products: product._id } }
    );
    if (product?.images?.length) {
      for (const { public_id } of product.images) {
        await cloudinary.uploader.destroy(public_id);
      }
    }

    response.status(200).json({ message: `Done`, product });
  } catch (error) {
    next(error);
  }
};
