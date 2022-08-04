const express = require("express");
const Image = require("../models/image")
const router = express.Router();

const User = require("../models/user")

// Create Admin
router.get("/:eventName/:certificateId", (req, res) => {
    Image.findOne(
        {
            "eventName": req.params.eventName
        }
    ).then((img) => {
        User.findOne(
            {
                "certificateId": req.params.certificateId,
            },
            ).then((u) => {
                console.log(u)
                res.render(("certificate") , {
                    user: u,
                    img: img
                })
            });

    })
      
  
    // Innovator.updateOne({email: req.query.email}, {$set: {hackAdmin: 'true'}})
    // .then(u=>res.send(u));
  });
  
module.exports = router;