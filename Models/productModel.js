const mongoose = require("mongoose");

const product_img = new mongoose.Schema(
  {
    public_id: String,
    secure_url: String,
  },
  { _id: false }
);

const schema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  images: [{ type: product_img }],
  available: Number,
  category: String, // enum [keywords,....]
});

module.exports = mongoose.model("products", schema);
