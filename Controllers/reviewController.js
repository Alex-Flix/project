const mongoose = require("mongoose");
const Review = mongoose.model("reviews");

exports.getAllReviews = async function (request, response, next) {
  try {
    const allReviews = await Review.find({})
    .populate([{path:"user_id",select:{firstName:1,lastName:1}},{path:"movie_id",select:{poster:1}}]);
    if (!allReviews.length) throw new Error("No Reviews exist");
    response.status(200).json({ message: "Done", data: allReviews });
  } catch (error) {
    next(error);
  }
};

exports.getAllMovieReviews = async function (request, response, next) {
  try {
    let { movieId } = request.params;
    const allMovieReviews = await Review.find({ movie_id: movieId });
    if (!allMovieReviews.length) throw new Error("No Reviews exist");
    response.status(200).json({ message: "Done", data: allMovieReviews });
  } catch (error) {
    next(error);
  }
};

exports.addNewReview = async function (request, response, next) {
  try {
    let {_id}=request.user
    let {  content } = request.body;
    let { movieId } = request.params;
    let review = new Review({ user_id:_id, movie_id: movieId, content });
    await review.save();
    response.status(201).json({ message: "Done", data: review });
  } catch (error) {
    next(error);
  }
};

exports.updateReview = async function (request, response, next) {
  try {
    let {_id}=request.user
    let { reviewId } = request.params;
    let { content } = request.body;
    let review = await Review.findOneAndUpdate(
      { _id: reviewId, user_id:_id },
      { content },
      { new: true }
    );

    if (!review) throw new Error("update failed");
    response.status(200).json({ message: "Done", date: review });
  } catch (error) {
    next(error);
  }
};

exports.deleteReview = async function (request, response, next) {
  try {
    let {_id,isAdmin}=request.user
    let { reviewId } = request.params;
    let obj = {_id:reviewId};
    if (!isAdmin) obj.user_id = _id;
    let review = await Review.findOneAndDelete(obj);
    if (!review) throw new Error("delete failed");
    response.status(200).json({ message: "Done", date: review });
  } catch (error) {
    next(error);
  }
};
