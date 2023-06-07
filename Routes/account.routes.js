const { Router } = require("express");
const accountController = require("../Controllers/account.controller");
const validate = require("../Middlewares/validation/validate");
const checkEmail = require("../Middlewares/services/uniqueEmail");
const accountValidation = require("../Middlewares/validation/accountValidation");

const router = Router();

router.post(
  "/Register",
  checkEmail,
  accountValidation.registerValidate,
  validate,
  accountController.register
);
router.post(
  "/Login",
  accountValidation.LoginValidate,
  validate,
  accountController.login
);
router.get("/confirmation/:id", accountController.confirmation);
router.get("/forgetPassword", accountController.forgetPassword); //sent email to get id
router.patch(
  "/forgetPassword/:id",
  accountValidation.forgetPasswordValidation,
  validate,
  accountController.forgetPasswordById
); // add new password

module.exports = router;
