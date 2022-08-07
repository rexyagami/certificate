const express = require("express");
const router = express.Router();
// const uploads = require("../config/s3");
const authController = require("../controllers/auth")

function isLoggedIn(req, res, next) {
    if (
        req.user
    )
        
        res.redirect("/");
    else return next();
  }

router.get("/signup", isLoggedIn, authController.GetSignUpPage);

router.post("/signup", isLoggedIn, authController.PostSignUpPage);

router.get("/login", isLoggedIn, authController.GetLoginPage);

router.post("/login", isLoggedIn, authController.PostLoginPage);

router.get("/logout", authController.Logout);


module.exports = router;