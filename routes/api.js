const express = require("express");
const router = express.Router();

const User = require("../models/user");

// Create Admin
router.get("/show-certificates/:email", (req, res) => {
    var certificatesArray = [];
   
    //     user_datas = user.find({ "email": email}, { "certificate_link":1})
    //     

    //   
    //     return certificates_array
      User.find(
        {
          "email": req.params.email,
        },
      ).then((u) => {
        for(i=0;i<u.length;i++) {
            var certificateId = u[i].certificateId;
            certificatesArray.push(certificateId)
        }
        res.send(certificatesArray)
      });
  
    // Innovator.updateOne({email: req.query.email}, {$set: {hackAdmin: 'true'}})
    // .then(u=>res.send(u));
  });
  
module.exports = router;