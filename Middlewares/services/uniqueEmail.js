const { model } = require("mongoose");

const User = model("users");

module.exports = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email })
    .then((data) => {
        if(data) throw new Error("Email already exists",{cause:411})
        next();
    })
    .catch((error) => next(error));
};
