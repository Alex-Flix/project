const mongoose = require("mongoose");
const Order = mongoose.model("orders");
// const User = mongoose.model("users");
const Product = mongoose.model("products");

module.exports.getAllUserOrders = function (req, res, next) {
  const { _id: user_id } = req.user;
  Order.find({ user_id })
    .then((data) => {
      if (data.length != 0) res.status(200).json({ message: "Done", data });
      else throw new Error("there is no orders yet");
    })
    .catch((error) => next(error));
};

module.exports.addNewOrder = async function (req, res, next) {
  let products = req.body.products.sort((a, b) => {
    if (a._id > b._id) return 1;
    else if (a._id < b._id) return -1;
    else return 0;
  });
  const { _id: user_id } = req.user;
  let data = req.checkedProducts;
  //creating order after passing all checks
  let object = {
    user_id,
    products: req.body.products,
    total_price: req.body.total_price,
    address: req.body.address,
    contact_phone: req.body.contact_phone,
  };

  new Order(object)
    .save()
    .then((obj) => {
      //Reducing the available quantity by the amount of the ordered ones
      for (let i = 0; i < data.length; i++) {
        data[i].available -= products[i].quantity;
        data[i].save();
      }
      res.status(201).json(obj);
    })
    // })
    .catch((error) => next(error));
};

module.exports.updateOrderById = async function (req, res, next) {
  try {
    let { _id, user_id, address, contact_phone } = req.body;

    const data = await Order.findOneAndUpdate(
      { _id, user_id },
      {
        contact_phone,
        "address.city": address?.city,
        "address.street": address?.street,
        "address.building": address?.building,
      },
      { new: true }
    );
    res.status(200).json({ message: "Done", data });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteOrderById = function (req, res, next) {
  const { _id: user_id } = req.user;

  let { _id } = req.body;
  let productIds = [];
  let products;
  Order.findOne({ _id, user_id, status: "pending" }, { status: 1, products: 1 })
    .then((object) => {
      if (!object) throw new Error("Order Doesn't exist");

      object.status = "cancelled";
      object.save();
      products = object.products.sort((a, b) => {
        if (a._id > b._id) return 1;
        else if (a._id < b._id) return -1;
        else return 0;
      });

      products.forEach((product) => {
        productIds.push(product._id);
      });
      return Product.find({ _id: { $in: productIds } }, { available: 1 }).sort({
        _id: 1,
      });
    })
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        data[i].available += products[i].quantity;
        data[i].save();
      }

      res.status(200).json({ message: "deleted", data });
    })

    .catch((error) => next(error));
};

module.exports.adminGetAllOrders = function (req, res, next) {
  Order.find()
    .populate([{ path: "user_id", select: { firstName: 1, lastName: 1 } }])
    .then((data) => {
      if (!data.length) throw new Error("there is no orders placed yet");
      res.status(200).json({ message: "Done", data });
    })
    .catch((error) => next(error));
};

module.exports.adminGetOrderById = function (req, res, next) {
  Order.findById(req.params.id)
    .then((data) => {
      if (!data) throw new Error("Order Doesn't Exist");
      res.status(200).json(data);
    })
    .catch((error) => next(error));
};

module.exports.adminDeleteOrderById = function (req, res, next) {
  let { _id } = req.params;
  let productIds = [];
  let products;
  Order.findOne({ _id, status: "pending" }, { status: 1, products: 1 })
    .then((object) => {
      if (!object) throw new Error("Order Doesn't exist");

      object.status = "cancelled";
      object.save();
      products = object.products.sort((a, b) => {
        if (a._id > b._id) return 1;
        else if (a._id < b._id) return -1;
        else return 0;
      });

      products.forEach((product) => {
        productIds.push(product._id);
      });
      return Product.find({ _id: { $in: productIds } }, { available: 1 }).sort({
        _id: 1,
      });
    })
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        data[i].available += products[i].quantity;
        data[i].save();
      }

      res.status(200).json({ message: "deleted" });
    })

    .catch((error) => next(error));
};
module.exports.adminUpdateOrderById = function (req, res, next) {
  let { _id } = req.params;
  Order.findOneAndUpdate(
    { _id, status: "pending" },
    {
      $set: { status: "approved" },
    }
  )
    .then((data) => {
      if (!data) throw new Error("Order Doesn't Exist");
      res.status(200).json({ message: "Done", data });
    })
    .catch((error) => next(error));
};
