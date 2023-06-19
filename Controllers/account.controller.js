const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { model } = require("mongoose");

const sendEmail = require("../Middlewares/services/sendEmail");
const User = model("users");

exports.register = (req, res, next) => {
  const { firstName, lastName, email, password, phone, gender, age } = req.body;
  const hashPassword = bcrypt.hashSync(password, +process.env.BUFFER);
  const userData = new User({
    firstName,
    lastName,
    email,
    password: hashPassword,
    phone,
    gender,
    age,
  });
  const id = jwt.sign({ id: userData._id }, process.env.KEY, {
    expiresIn: "1h",
  });
  const confirmationLink = `${process.env.Url_FrontEnd}/login/?id=${id}`;
  sendEmail
    .sendMessage({
      to: email,
      subject: "confirmationEmail",
      html: sendEmail.confirmationEmail(
        "confirm your email address",
        confirmationLink
      ),
    })
    .then(() => userData.save())
    .then(() =>
      res.status(201).json({ message: "Please check your email address" })
    )
    .catch((error) => next(error));
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(async (data) => {
      if (!data) throw new Error("invalid email or password");

      if (!data.confirmation) {
        const id = jwt.sign({ id: data._id }, process.env.KEY, {
          expiresIn: "1h",
        });
        const confirmationLink = `${process.env.Url_FrontEnd}/login/?id=${id}`;
        await sendEmail.sendMessage({
          to: email,
          subject: "confirmationEmail",
          html: sendEmail.confirmationEmail(
            "confirm your email address",
            confirmationLink
          ),
        });
        throw new Error("Please check your email address");
      }

      if (!data.status) throw new Error("your email has been blocked");

      const checkPassword = bcrypt.compareSync(password, data.password);
      if (!checkPassword) throw new Error("invalid email or password");
      const { _id, isAdmin } = data;
      const token = jwt.sign({ _id, isAdmin }, process.env.KEY);
      res.status(200).json({ message: "done", token });
    })
    .catch((error) => next(error));
};

exports.confirmation = (req, res, next) => {
  const { id } = req.params;
  const { id: _id } = jwt.verify(id, process.env.KEY);
  User.updateOne(
    { _id },
    {
      $set: { confirmation: true },
    }
  )
    .then((data) => {
      if (!data.modifiedCount)
        throw new Error("already confirmation", { cause: 400 });

      res.status(200).json({ message: "Done" });
    })
    .catch((error) => next(error));
};

exports.forgetPassword = (req, res, next) => {
  const { email } = req.params;
  User.findOne({ email })
    .then((data) => {
      if (!data) throw new Error("your email not exist ");

      const id = jwt.sign({ id: data._id }, process.env.KEY, {
        expiresIn: "1h",
      });

      const confirmationLink = `${process.env.Url_FrontEnd}/resetPassword/${id}`;
      return sendEmail.sendMessage({
        to: email,
        subject: "forgetPassword",
        html: sendEmail.confirmationEmail(
          "confirm your new Password",
          confirmationLink
        ),
      });
    })
    .then(() =>
      res.status(200).json({ message: "Please check your email address" })
    )
    .catch((error) => next(error));
};
exports.forgetPasswordById = (req, res, next) => {
  const { id } = req.params;
  const { password } = req.body;

  const hashPassword = bcrypt.hashSync(password, +process.env.BUFFER);
  const { id: _id } = jwt.verify(id, process.env.KEY);

  User.updateOne(
    { _id },
    {
      $set: { password: hashPassword },
    }
  )
    .then((data) => {
      if (!data.modifiedCount) throw new Error("error change", { cause: 400 });

      res.status(200).json({ message: "Done" });
    })
    .catch((error) => next(error));
};
