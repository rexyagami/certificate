const express = require("express");
const router = express.Router();

// Create Admin
router.get("/addadmin", (req, res) => {
    if (
      req.user &&
      req.user.userType == "admin" &&
      superAdmins.includes(req.user.username)
    ) {
      Innovator.updateOne(
        {
          email: req.query.email,
        },
        {
          $set: {
            hackAdmin: "true",
          },
        }
      ).then((u) => res.send(u));
    } else {
      res.render("404");
    }
  
    // Innovator.updateOne({email: req.query.email}, {$set: {hackAdmin: 'true'}})
    // .then(u=>res.send(u));
  });
  
module.exports = router;