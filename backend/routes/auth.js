const express = require("express");
const { signup, signin, signout, requireSignin } = require("../controllers/auth");
const { runValidation } = require("../validators");
const {
  userSignupValidator,
  userSigninValidator,
} = require("../validators/auth");
const router = express.Router();
router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/signout", signout);
//test
router.get("/secret",requireSignin, (req, res) => {
  res.json({ message: "you have access to secret page" });
});

module.exports = router;
