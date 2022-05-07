const express = require("express");
const { body } = require("express-validator");
const userControllers = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.put("/signup", [
  body("email")
    .isEmail()
    .withMessage("Please Enter a valid email")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject("Email already exists!");
        }
      });
    })
    .normalizeEmail(),
  body("password").trim().isLength({ min: 5 }),
  body("name").not().isEmpty(),
], userControllers.signup);

router.post('/login', userControllers.login)

module.exports = router;
