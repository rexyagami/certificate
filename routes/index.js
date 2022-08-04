const express = require("express");
const router = express.Router();
const uploads = require("../config/s3");
const indexController = require("../controllers/index")

// Create Admin
router.get("/", indexController.GetAdminPage);

router.get("/create", indexController.UploadImage);

router.post("/create", uploads.aws.single('file'), indexController.PostUploadImage);

// router.get("/upload-csv/:imagePath", (req, res) => {
//   res.render("uploadCsv");  
// })
router.post("/upload-csv", uploads.localStorage.single('csv'), indexController.UploadCSV)

router.get("/mailer/:eventName", indexController.GetMailerPage);

router.post("/mailer/:eventName", indexController.PostMailerPage);

module.exports = router;