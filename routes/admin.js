const express = require("express");
const router = express.Router();
const uploads = require("../config/s3");
const { sendCertificate } = require("../utils/mail");
const adminController = require("../controllers/admin")
const User = require("../models/user");
// Create Admin
router.get("/", adminController.GetAdminPage);

router.post("/", uploads.aws.single('file'), adminController.PostAdminPage);

// router.get("/upload-csv/:imagePath", (req, res) => {
//   res.render("uploadCsv");  
// })
router.post("/upload-csv", uploads.localStorage.single('csv'), adminController.UploadCSV)

router.get("/mailer/:eventName", (req, res) => {
    res.render("mailer");  
});

router.post("/mailer/:eventName", (req, res) => {
    console.log(req.body)
    const eventName = req.body.eventName
    User.find(
      {
        "eventName": eventName
      }
    ).then((users) => {
      console.log(users,"//////////////////////")
      for(i=0;i<users.length;i++) {
        sendCertificate(users[i].name, users[i].email, users[i].certificateLink, req.body.subject, req.body.body)
      }
    })
    res.redirect("/admin");
});

module.exports = router;