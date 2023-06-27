const { model } = require("mongoose");
const cloudinary = require("../Middlewares/services/cloudinary");
const bcrypt = require("bcrypt");
const sendEmail = require("../Middlewares/services/sendEmail");
const jwt = require("jsonwebtoken");

const User = model("users");
const Review = model("reviews");

exports.getUserData = (req, res, next) => {
  const { _id } = req.user;
  User.findById({ _id }, { password: 0, confirmation: 0, status: 0 })
    .then((data) => {
      if (!data) throw new Error("User not Found");
      res.status(200).json({ message: "Done", data });
    })
    .catch((err) => next(err));
};

exports.updateUser = (req, res, next) => {
  const { _id } = req.user;
  const { firstName, lastName, phone, gender, age } = req.body;

  User.updateOne({ _id }, { $set: { firstName, lastName, phone, gender, age } })
    .then((data) => {
      // if (!data.modifiedCount) throw new Error("Update Fail");
      res.status(200).json({ message: "Done" });
    })
    .catch((err) => next(err));
};

exports.addProfileImgForUser = (req, res, next) => {
  const { _id } = req.user;
  const { path } = req.file;
  const { _id: userId } = req.body;
  const id = userId ? userId : _id;
  cloudinary.uploader
    .upload(path, { folder: "img/user/profile" })
    .then(({ secure_url, public_id }) => {
      const profile_img = { secure_url, public_id };
      return User.findByIdAndUpdate({ _id: id }, { $set: { profile_img } });
    })
    .then((data) => {
      if (!data) throw new Error("Update Fail");
      if (!data?.profile_img?.public_id) return data;
      const { public_id } = data.profile_img;
      return cloudinary.uploader.destroy(public_id);
    })
    .then((data) => {
      if (!data?.result) return res.status(200).json({ message: "Done" });
      if (data.result !== "ok") throw new Error(data.result);
      res.status(200).json({ message: "Done" });
    })
    .catch((err) => next(err));
};

// button has user id when admin delete him
exports.deleteUser = (req, res, next) => {
  const { _id } = req.user;

  Review.deleteMany({ user_id: _id })
    .then(() => {
      return User.findByIdAndDelete({ _id });
    })
    .then((data) => {
      if (!data) throw new Error("delete Fail");
      if (!data?.profile_img?.public_id) return data;
      const { public_id } = data.profile_img;
      return cloudinary.uploader.destroy(public_id);
    })
    .then((data) => {
      if (!data?.result) return res.status(200).json({ message: "Done" });
      if (data.result !== "ok") throw new Error(data.result);
      res.status(200).json({ message: "Done" });
    })
    .catch((err) => next(err));
};

exports.getFavoritesUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById({ _id }, {_id:0, favorites: 1 })
    .then((data) => {
      if (!data?.favorites.length) throw new Error("User Favorites not found");
      res.status(200).json({ message: "Done",data: data.favorites });
    })
    .catch((err) => next(err));
};

exports.addFavoritesUser = (req, res, next) => {
  const { _id } = req.user;
  const { id } = req.body;
  const { name, poster_image } = req.moves;
  User.updateOne({ _id }, { $addToSet: { favorites: { id, name, poster:poster_image } } })
    .then((data) => {
      if (!data.modifiedCount) throw new Error("Update Favorites Fail");
      res.status(200).json({ message: "Done" });
    })
    .catch((err) => next(err));
};

exports.deleteFavoritesUser = (req, res, next) => {
  const { _id } = req.user;
  const { id } = req.params;
  User.updateOne({ _id }, { $pull: { favorites: { id } } })
    .then((data) => {
      if (!data.modifiedCount) throw new Error("Delete Favorites Fail");
      res.status(200).json({ message: "Done" });
    })
    .catch((err) => next(err));
};

exports.changePasswordUser = (req, res, next) => {
  const { _id } = req.user;
  const { currentPassword, password } = req.body;
  User.findById({ _id }, { password: 1 })
    .then((data) => {
      if (!data) throw new Error("User not found");
      const checkPassword = bcrypt.compareSync(currentPassword, data.password);
      if (!checkPassword) throw new Error("invalid password");
      const hashPassword = bcrypt.hashSync(password, +process.env.BUFFER);
      return User.updateOne({ _id }, { $set: { password: hashPassword } });
    })
    .then((data) => {
      if (!data.modifiedCount) throw new Error("Change Password Fail");
      res.status(200).json({ message: "Done" });
    })
    .catch((err) => next(err));
};

/*
Admin
*/

exports.getAllUsers = (req, res, next) => {
  const { page } = req.query;
  if (!page || page < 0) page = 1;
  const limit = 12;
  const skip = (page - 1) * limit;
  User.find({}, { password: 0, confirmation: 0 })
    .sort({ firstName: 1, lastName: 1 })
    .skip(skip)
    .limit(limit)
    .then(async (data) => {
      if (!data.length) throw new Error("Users not found");
      let totalPages = await User.countDocuments({});
      totalPages = Math.ceil(totalPages / limit);
      res.status(200).json({ message: "Done", data, totalPages });
    })
    .catch((err) => next(err));
};

exports.searchUser = (req, res, next) => {
  let { name } = req.params;
  const { page } = req.query;
  if (!page || page < 0) page = 1;
  const limit = 12;
  const skip = (page - 1) * limit;
  name = name.split(" ");
  if (!name[1]) name[1] = "";
  const first = {
    firstName: { $regex: name[0], $options: "i" },
    lastName: { $regex: name[1], $options: "i" },
  };
  const last = {
    firstName: { $regex: name[1], $options: "i" },
    lastName: { $regex: name[0], $options: "i" },
  };

  User.find({ $or: [first, last] }, { password: 0, confirmation: 0 })
    .sort({ firstName: 1, lastName: 1 })
    .skip(skip)
    .limit(limit)
    .then(async (data) => {
      let totalPages = await User.countDocuments({ $or: [first, last] });
      totalPages = Math.ceil(totalPages / limit);
      res.status(200).json({ message: "Done", data,totalPages });
    })
    .catch((err) => next(err));
};

exports.addUser = (req, res, next) => {
  const { firstName, lastName, email, phone, gender, age, isAdmin } = req.body;


  const password = "Alex@"+Math.floor(Math.random() * 101);

  const hashPassword = bcrypt.hashSync(password, +process.env.BUFFER);

  const userData = new User({
    firstName,
    lastName,
    email,
    password: hashPassword,
    phone,
    gender,
    age,
    isAdmin,
  });
  const id = jwt.sign({ id: userData._id }, process.env.KEY);
  const confirmationLink = `${process.env.Url_FrontEnd}/login/?id=${id}`;
  sendEmail
    .sendMessage({
      to: email,
      subject: "confirmationEmail",
      html: sendEmail.confirmationEmailWithPassword(
        "confirm your email address and send your Password",
        confirmationLink,
        password
      ),
    })
    .then(() => userData.save())
    .then((data) => res.status(201).json({ message: "Done", data }))
    .catch((error) => next(error));
};

exports.softDeleteUser = (req, res, next) => {
  const { id } = req.params;

  User.findById({ _id: id }, { status: 1 })
    .then((data) => {
      if (!data) throw new Error("User not find");
      data.status = !data.status;
      return data.save();
    })
    .then((data) => {
      if (!data) throw new Error("block Fail");
      res.status(200).json({ message: "Done" });
    })
    .catch((err) => next(err));
};
