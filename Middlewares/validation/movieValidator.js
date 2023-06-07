const { query, body } = require("express-validator");

exports.addMoviesArray = [
  body("name").isString().withMessage("name should be String"),
  body("rate").isNumeric().withMessage("rate should be number"),
  body("type").isString().withMessage("type should be String"),
  body("category").isArray().withMessage("category should be Array"),
  body("products").isArray().withMessage("products should be Array"),
  body("production_year")
    
    .isNumeric()
    .withMessage("production_year should be Number"),
  body("trailer").isString().withMessage("trailer should be String"),
  body("poster").isString().withMessage("poster should be String"),
  body("videos").isString().withMessage("videos should be String"),
];
exports.updateMoviesArray = [
  body("name").optional().isString().withMessage("name should be String"),
  body("rate").optional().isNumeric().withMessage("rate should be number"),
  body("type").optional().isString().withMessage("type should be String"),
  body("category").optional().isArray().withMessage("category should be Array"),
  body("products").optional().isArray().withMessage("products should be Array"),
  body("production_year")
    .optional()
    .isNumeric()
    .withMessage("production_year should be Number"),
  body("trailer").optional().isString().withMessage("trailer should be String"),
  body("poster").optional().isString().withMessage("poster should be String"),
  body("videos").optional().isString().withMessage("videos should be String"),
];

exports.searchMovieArray = [
  query("name").optional().isString().withMessage("name should be String"),
  query("rate").optional().isString().withMessage("rate should be number"),
  query("type").optional().isString().withMessage("type should be String"),
  query("production_year")
    .optional()
    .isNumeric()
    .withMessage("production_year should be Number"),
];
