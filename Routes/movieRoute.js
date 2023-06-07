const express = require("express");

const validator = require("../Middlewares/validation/validate");
const controller = require("./../Controllers/movieController");
const movieValidator = require("../Middlewares/validation/movieValidator");
const { authorization } = require("../Middlewares/auth");
const router = express.Router();

router
  .route("/movies")
  .get(controller.getAllMovies)
  .post(authorization,movieValidator.addMoviesArray, validator, controller.addNewMovie);

router
  .route("/movies/search")
  .get(movieValidator.searchMovieArray, validator, controller.searchMovie);


router
  .route("/movies/:id")
  .get(controller.getMovieById)
  .patch(authorization,movieValidator.updateMoviesArray, validator, controller.updateMovieById)
  .delete(authorization,controller.deleteMovieById);

module.exports = router;
