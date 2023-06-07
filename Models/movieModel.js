const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  rate: Number,
  type: String, // movie , series
  description: String,
  category: [{ type: String }], // romance , action , ..
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
  production_year: Number,
  trailer: String,
  poster_image: String,
  cover_image: String,
  videos: String,
});

module.exports = mongoose.model("movies", schema);
