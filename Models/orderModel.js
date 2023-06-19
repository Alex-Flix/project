const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    city: String,
    street: String,
    building: Number,
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
    name: String,
    price: Number,
    quantity: Number,
  },
  { _id: false }
);

const schema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  status: {
    type: String,
    match: /\b(pending|approved|cancelled|shipped)\b/gi,
    default: "pending",
  },
  products: [{ type: productSchema }],
  total_price: Number,
  address: { type: addressSchema },
  contact_phone: { type: String, match: /\b(002)?0\d{10}\b/gm },
  notes: String,
  // if user want to give instruction of delivery
});

mongoose.model("orders", schema);
