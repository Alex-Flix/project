const { Schema, model } = require("mongoose");

const favorite = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
      ref: "movies",
    },
    name: String,
    poster: String,
  },
  { _id: false }
);

const profile_img = new Schema(
  {
    public_id: String,
    secure_url: String,
  },
  { _id: false }
);

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phone: Number,
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  age: Number,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  favorites: [favorite],
  profile_img,
  confirmation: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

model("users", userSchema);
