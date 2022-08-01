const express = require("express");
const router = express.Router();
const uploads = require("../config/s3");
const multer = require("multer");
const csv = require("csvtojson");
const Image = require("../models/image");
const { sendCertificate } = require("../utils/mail");
const path = require("path")
const User = require("../models/user")

// Create Admin
router.get("/", (req, res) => {
    res.render("upload");  
});

router.post("/", uploads.single('file'), (req, res) => {
    console.log(req.body)
    console.log(req.file);
    if (!req.files) {
            res.status(400).send("nofile");
            console.log(req.file);
            return;
          }
    var imagePath = req.file.path
    Image.create({
        image: imagePath
    });

    console.log(`Success!\n Image uploaded to ${imagePath}`);

            // if (i == req.files.length - 1) {
            //   res.redirect("/mailer");
            // }
          
    // console.log(req.files[1],req.files[1].path)
    res.send("done")
    // CreateHackathon.updateOne(
    //     { hackathonName: req.body.hackName },
    //     {
    //     $set: {
    //         restrictions: {
    //         email: true,
    //         },
    //     },
    //     },
    //     { upsert: false, multi: true }
    // ).then((c) => {
        // console.log(c);
        // res.send({ status: "success", code: "done" });
    // });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(path.join(__dirname, "../public/upload/"));
    cb(null, path.join(__dirname, "../public/upload/"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/upload-csv", upload.single('csv'), (req, res) => {
  csv()
    .fromFile(req.file.path)
    .then((jsonObj) => {
      console.log(jsonObj);
      for (var x = 0; x < jsonObj.length; x++) {
        
        
        console.log(jsonObj[x]);
        User.create(jsonObj[x], (err, data) => {
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
    res.redirect("/admin/mailer");
})

router.get("/mailer", (req, res) => {
    res.render("mailer");  
});

router.post("/mailer", (req, res) => {
    console.log(req.body)
    sendCertificate("prachi", "prachi@hack2skill.com", "invinciblenobita.github.io", req.body.subject, req.body.body)
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