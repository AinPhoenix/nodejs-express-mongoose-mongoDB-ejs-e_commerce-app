const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");

const authController = require("./../controllers/auth");
const User = require("./../models/user");

// GET ROUTES
router.get("/login", authController.getLogin);
router.get("/signup", authController.getSignup);
router.get("/reset", authController.getReset);
router.get("/reset/:token", authController.getNewPassword);

// POST ROUTES
router.post("/login", body("email").isEmail().withMessage("Please provide valid email").normalizeEmail(), authController.postLogin);
router.post("/logout", authController.postLogout);
router.post(
  "/signup",
  check("email")
    .isEmail()
    .withMessage("Please Enter A Valid Email")
    .custom((value, { req }) => {
      //   if (value === "test@test.com") {
      //     throw new Error("This email address is forbidden");
      //   }
      //   return true;

      return User.findOne({ email: value }).then((userObj) => {
        if (userObj) {
          return Promise.reject("Email already taken");
        }
      });
    })
    .normalizeEmail(),
  body("password", "Please Enter a password with only numbers and text at least 5 characters.").isLength({ min: 5 }).isAlphanumeric().trim(),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords have to match");
    }

    return true;
  }),
  authController.postSignup
);
router.post("/reset", authController.postReset);
router.post("/new-password", authController.postNewPassword);

module.exports = router;
