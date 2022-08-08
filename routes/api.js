const express = require("express");
const router = express.Router();

const User = require("../models/user");
const apiController = require("../controllers/api");

function isSuperAdmin(req, res, next) {
  if (
      req.user &&
      req.user.role == "superAdmin"
  )
      return next();
    res.redirect("/");
}

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
  
router.post("/change-role", isSuperAdmin, apiController.ChangeInnovatorRole);

router.post("/request-access", apiController.RequestAccess);

module.exports = router;