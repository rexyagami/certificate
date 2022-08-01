const express = require("express");
const router = express.Router();

const User = require("../models/user")

// Create Admin
router.get("/:certificateId", (req, res) => {
      User.findOne(
        {
            "certificateId": req.params.certificateId,
        },
        ).then((u) => {
            console.log(u)
            res.render(("certificate") , {
                user: u
            })
        });
  
    // Innovator.updateOne({email: req.query.email}, {$set: {hackAdmin: 'true'}})
    // .then(u=>res.send(u));
  });
  
module.exports = router;