const express = require("express");
const router = express.Router();
// const uploads = require("../config/s3");
const adminController = require("../controllers/admin")

function isSuperAdmin(req, res, next) {
    if (
        req.user &&
        req.user.role == "superAdmin"
    )
        return next();
    res.render("404");
  }
// Create Admin
router.get("/", isSuperAdmin, adminController.GetAdminPage);

router.get("/users", isSuperAdmin, adminController.GetUsersPage);

// router.get("/create", adminController.UploadImage);

// router.post("/create", uploads.aws.single('file'), adminController.PostUploadImage);

// // router.get("/upload-csv/:imagePath", (req, res) => {
// //   res.render("uploadCsv");  
// // })
// router.post("/upload-csv", uploads.localStorage.single('csv'), adminController.UploadCSV)

// router.get("/mailer/:eventName", adminController.GetMailerPage);

// router.post("/mailer/:eventName", adminController.PostMailerPage);

module.exports = router;