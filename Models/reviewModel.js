const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  movie_id: { type: mongoose.Schema.Types.ObjectId, ref: "movies" },
  content: String,
});

module.exports = mongoose.model("reviews", schema);
