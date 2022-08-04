const express = require("express");
const router = express.Router();
const uploads = require("../config/s3");
const csv = require("csvtojson");
const { sendCertificate } = require("../utils/mail");
const User = require("../models/user")
const adminController = require("../controllers/admin")

// Create Admin
router.get("/", adminController.GetAdminIntialPage);
router.get("/create", adminController.GetAdminPage);

router.post("/create", uploads.aws.single('file'), adminController.PostAdminPage);

// router.get("/upload-csv/:imagePath", (req, res) => {
//   res.render("uploadCsv");  
// })
router.post("/upload-csv", uploads.localStorage.single('csv'), (req, res) => {
  console.log(req.body)
  const imagePath = req.body.imagePath
  const variableData = req.body.variableData
  csv()
    .fromFile(req.file.path)
    .then((jsonObj) => {
      //console.log(jsonObj);
      for (var x = 0; x < jsonObj.length; x++) {
        
        var user = jsonObj[x];
        user.imagePath = imagePath
        user.variableData = variableData
        // user.certificateLink = "https://invinciblenobita.github.io" //TODO: certifucatelink generation
        user.certificateLink = `${process.env.DOMAIN}/user/${user.certificateId}` //TODO: certifucatelink generation
        console.log(user);
        User.create(user, (err, data) => {
          if (err) {
            console.log(err);
            throw err;
          } else console.log(data);
        });
        
        // delete newUser[name]
        // Innovator.create(jsonObj[x], (err, data) => {
        //   if (err) {
        //     console.log(err);
        //     throw err;
        //   } else console.log(data);
        // });
      }
      // res.redirect("/");
    //   res.redirect("back");
    });
    res.render("mailer", {
      imagePath: imagePath
    });
})

// router.get("/mailer/:imagePath", (req, res) => {
//     res.render("mailer");  
// });

router.post("/mailer", (req, res) => {
    console.log(req.body)
    const imagePath = req.body.imagePath
    User.find(
      {
        "imagePath": imagePath
      }
    ).then((users) => {
      console.log(users,"//////////////////////")
      for(i=0;i<users.length;i++) {
        sendCertificate(users[i].name, users[i].email, users[i].certificateLink, req.body.subject, req.body.body)
      }
    })
    
    // if (!req.files) {
    //     res.status(400).send("nofile");
    //     console.log(req.file);
    //     return;
    // }
    
    // for (var i = 0; i < req.files.length; i++) {
    //     // Image.create({
    //     //   image: req.files[i].location,
    //     // });

    //     console.log(`Success!\n Image uploaded to ${req.files[i].location}`);

    //     if (i == req.files.length - 1) {
    //         res.redirect("/mailer");
    //     }
    // }
    res.redirect("/admin");
});

module.exports = router;