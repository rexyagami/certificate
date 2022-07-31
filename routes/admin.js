const express = require("express");
const router = express.Router();
const uploads = require("../config/s3");

// Create Admin
router.get("/", (req, res) => {
    res.render("upload");  
});

router.post("/", uploads.any(), (req, res) => {
    console.log(req.body)
    res.redirect("/admin/mailer");
    // if (!req.files) {
    //     res.status(400).send("nofile");
    //     console.log(req.file);
    //     return;
    //   }
    
    //   for (var i = 0; i < req.files.length; i++) {
    //     // Image.create({
    //     //   image: req.files[i].location,
    //     // });
    
    //     console.log(`Success!\n Image uploaded to ${req.files[i].location}`);
    
    //     if (i == req.files.length - 1) {
    //       res.redirect("/mailer");
    //     }
    //   }
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
router.get("/mailer", (req, res) => {
    res.render("mailer");  
});

router.post("/mailer", (req, res) => {
    console.log(req.body)
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