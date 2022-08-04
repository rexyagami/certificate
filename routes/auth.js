const express = require("express");
const router = express.Router();
// const uploads = require("../config/s3");
const authController = require("../controllers/auth")

router.get("/signup", authController.GetSignUpPage);

router.post("/signup", authController.PostSignUpPage);

router.get("/login", authController.GetLoginPage);

router.post("/login", authController.PostLoginPage);




module.exports = router;