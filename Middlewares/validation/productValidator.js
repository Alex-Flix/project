const { query, body, param } = require("express-validator");

exports.productArray = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("price")
    .notEmpty()
    .isNumeric()
    .withMessage("Price must be a number")
    .custom((value, { req }) => {
      if (value <= 0) {
        throw new Error("Price must be greater than zero");
      }
      return true;
    }),
  body("description")
    .notEmpty()
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 5 })
    .withMessage("Description must be at least 5 characters long"),
  // body("images").isArray().withMessage("Images must be an array"),
  // body('images.*.product_img').isString().withMessage('Product image must be a string'),
  // body("colors").isArray().notEmpty().withMessage("colors must be an array"),
  body("colors.*").isString().withMessage("Colors must be a string"),
  body("available")
    .notEmpty()
    .isNumeric()
    .withMessage("Available must be a number"),
  body("category")
    .notEmpty()
    .isIn(["T-shirt", "Mug", "Accessories"])
    .withMessage("Category must be one of >> [T-shirt , Mug , Accessories]"),
];

exports.updatingArray = [
  body("name").optional().isString().withMessage("Name must be a string"),
  body("price")
    .optional()
    .isNumeric()
    .withMessage("Price must be a number")
    .custom((value, { req }) => {
      if (value <= 0) {
        throw new Error("Price must be greater than zero");
      }
      return true;
    }),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 5 })
    .withMessage("Description must be at least 5 characters long"),
  // body("images").optional().isArray().withMessage("Images must be an array"),
  body("colors")
    .optional()
    .isArray()
    .notEmpty()
    .withMessage("colors must be an array"),
  body("colors.*").optional().isString().withMessage("Colors must be a string"),
  body("available")
    .optional()
    .isNumeric()
    .withMessage("Available must be a number"),
  body("category")
    .optional()
    .isIn(["T-shirt", "Mug"])
    .withMessage("Category must be one of these [T-shirt,Mug]"),
];

exports.searchArray = [
  query("name").optional().isString().withMessage("name should be String"),
  query("price").optional().isNumeric().withMessage("price should be number"),
  query("category")
    .optional()
    .isString()
    .withMessage("category should be String")
    .isIn(["T-shirt", "Mug"])
    .withMessage("Category must be one of these [T-shirt,Mug]"),
];

exports.handlingWithId = [
  param("id").isMongoId().withMessage("Id Should Be Object ID"),
];
