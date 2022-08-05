const express = require("express");
const router = express.Router();
const uploads = require("../config/s3");
const indexController = require("../controllers/index")

function isAuthenticated(req, res, next) {
    if (req.user) return next();
    res.render("404");
  }
  

// Create Admin
router.get("/", indexController.GetHomePage);

router.get("/create", isAuthenticated, indexController.UploadImage);

router.post("/create", uploads.aws.single('file'), isAuthenticated, indexController.PostUploadImage);

// router.get("/upload-csv/:imagePath", (req, res) => {
//   res.render("uploadCsv");  
// })
router.post("/upload-csv", uploads.localStorage.single('csv'), isAuthenticated, indexController.UploadCSV)

router.get("/mailer/:eventName", isAuthenticated, indexController.GetMailerPage);

router.post("/mailer/:eventName", isAuthenticated, indexController.PostMailerPage);

module.exports = router;