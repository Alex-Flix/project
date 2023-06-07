const express = require("express");

const validator = require("../Middlewares/validation/validate");
const controller = require("./../Controllers/productController");
const productValidator = require("../Middlewares/validation/productValidator");
const { multerData, formats } = require("../Middlewares/services/multer");
const { authorization } = require("../Middlewares/auth");

const router = express.Router();

router
  .route("/products")
  .get(controller.getAllProducts)
  .post(
    authorization,
    multerData(formats.imageFormats).array("img"),
    productValidator.productArray,
    validator,
    controller.createProduct
  );

router.route("/products/search").get(controller.searchProduct);

router
  .route("/products/:id")
  .get(productValidator.handlingWithId, validator, controller.getProductById)
  .patch(
    authorization,
    productValidator.updatingArray,
    validator,
    controller.updateProductById
  )
  .delete(
    authorization,
    productValidator.handlingWithId,
    validator,
    controller.deleteProductById
  );

module.exports = router;
