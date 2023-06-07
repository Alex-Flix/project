const mongoose = require("mongoose");
const Product = mongoose.model("products");

exports.checks = function (req, res, next) {
  let errorsArray = [];
  let productIds = [];
  let products = req.body.products.sort((a, b) => {
    if (a._id > b._id) return 1;
    else if (a._id < b._id) return -1;
    else return 0;
  });

  products.forEach((product) => {
    productIds.push(product._id);
  });

  //check for products existance
  Product.find({ _id: { $in: productIds } }, { available: 1, name: 1 })
    .sort({ _id: 1 })

    .then((data) => {
      for (let product of products) {
        let targetProduct = data.find((elem) => elem._id == product._id);
        //check for products existance
        if (!targetProduct) {
          //Error handling 1
          product.errorMsg = "not exist";
          errorsArray.push(product);
        } else if (
          targetProduct &&
          targetProduct.available < product.quantity
        ) {
          //Error handling 2
          targetProduct.errorMsg = "quantity not available";
          errorsArray.push(targetProduct);
        }
      }

      //Errors render
      if (errorsArray.length > 0) {
        let errorMessage = errorsArray.reduce((currentValue, nextValue) => {
          return (
            currentValue + `Product ${nextValue.name} ${nextValue.errorMsg} ,`
          );
        }, "");
        throw new Error(errorMessage);
      } else {
        req.checkedProducts = data;
        next();
      }
    })
    .catch((error) => next(error));
};
