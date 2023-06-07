const { body } = require("express-validator");

exports.forgetPasswordValidation = [
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*])[a-zA-Z\d!@#$%&*]{5,}$/
    )
    .withMessage(
      "Password must contain uppercase letter, lowercase letter, number, and one of the special characters "
    )
];


exports.LoginValidate = [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*])[a-zA-Z\d!@#$%&*]{5,}$/
      )
      .withMessage(
        "Password must contain uppercase letter, lowercase letter, number, and one of the special characters "
      ),
  ];


  
const allowedGenders = ["male", "female"];
const minAge = 18;
const maxAge = 40;

exports.registerValidate = [
  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long"),

  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters long"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
  ,
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*])[a-zA-Z\d!@#$%&*]{5,}$/
    )
    .withMessage(
      "Password must contain uppercase letter, lowercase letter, number, and one of the special characters "
    ),

  body("phone") //string input
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone("ar-EG")
    .withMessage("Invalid phone number")
    .isLength({ min: 11, max: 11 })
    .withMessage("Phone number must have 11 digits"),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(allowedGenders)
    .withMessage(`Gender must be one of ${allowedGenders.join("-")}`),

  body("age")
    .notEmpty()
    .withMessage("Age is required")
    .isNumeric()
    .withMessage("Age must be a number")
    .toInt()
    .isInt({ min: minAge, max: maxAge })
    .withMessage(`Age must be between ${minAge} and ${maxAge}`),
];
