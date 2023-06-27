const { param, body } = require("express-validator");

module.exports.addNewOrder = [
  body("products")
    .isArray()
    .withMessage("products should be an Array")
    .notEmpty()
    .withMessage("products shouldn't be empty"),
  body("products.*")
    .isObject()
    .withMessage("product should be an object")
    .notEmpty()
    .withMessage("product shouldn't be empty"),
  body("products.*._id")
    .isMongoId()
    .withMessage("product id should be integer")
    .notEmpty()
    .withMessage("product id shouldn't be empty"),
  body("products.*.name")
    .isString()
    .withMessage("name should be string")
    .notEmpty()
    .withMessage("product name shouldn't be empty"),
  body("products.*.price")
    .isFloat()
    .withMessage("price should be number")
    .notEmpty()
    .withMessage("product price shouldn't be empty"),
  body("products.*.quantity")
    .isInt()
    .withMessage("quantity should be integer")
    .notEmpty()
    .withMessage("product quantity shouldn't be empty"),
  body("total_price")
    .isFloat()
    .withMessage("total price should be number")
    .notEmpty()
    .withMessage("total price shoudn't be empty"),
  body("address")
    .isObject()
    .withMessage("address should be an object")
    .notEmpty()
    .withMessage("address shouldn't be empty"),
  body("address.city")
    .isString()
    .withMessage("city should be a string")
    .notEmpty()
    .withMessage("city shouldn't be empty"),
  body("address.street")
    .isString()
    .withMessage("street should be a string")
    .notEmpty()
    .withMessage("street shouldn't be empty"),
  body("address.building")
    .isString()
    .withMessage("building should be a string")
    .notEmpty()
    .withMessage("building shouldn't be empty"),
  body("contact_phone")
    .matches(/(002)?0\d{10}\b/gm)
    .withMessage("please enter a valid phone number")
    .notEmpty()
    .withMessage("contact phone shouldn't be empty"),
  body("notes").optional(true).isString().withMessage("notes should be string"),
];

module.exports.updateOrder = [
  body("address")
    .optional(true)
    .isObject()
    .withMessage("address should be an object"),
  body("address.city")
    .optional(true)
    .isString()
    .withMessage("city should be a string")
    .notEmpty()
    .withMessage("city shouldn't be empty"),
  body("address.street")
    .optional(true)
    .isString()
    .withMessage("street should be a string")
    .notEmpty()
    .withMessage("street shouldn't be empty"),
  body("address.building")
    .optional(true)
    .isString()
    .withMessage("building should be a string")
    .notEmpty()
    .withMessage("building shouldn't be empty"),
  body("contact_phone")
    .optional(true)
    .isMobilePhone()
    .withMessage("please enter a valid phone number")
    .notEmpty()
    .withMessage("contact phone shouldn't be empty"),
];

module.exports.deleteOrder = [
  body("_id")
    .isMongoId()
    .withMessage("order id should be mongoId")
    .notEmpty()
    .withMessage("you should enter the order id"),
];

module.exports.paramMongoIdCheck = param("_id")
  .isMongoId()
  .withMessage("id should be mongoId")
  .notEmpty()
  .withMessage("id shouldn't be empty");
