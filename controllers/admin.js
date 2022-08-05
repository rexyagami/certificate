const csv = require("csvtojson");
const User = require("../models/user");
const Image = require("../models/image");
const mailer = require("../utils/mail");

module.exports.GetAdminPage = (req, res) => {
    res.render("admin", {

    });  
}

// module.exports.PostMailerPage = (req, res) => {
//     console.log(req.body)
//     const eventName = req.params.eventName
//     User.find(
//       {
//         "eventName": eventName
//       }
//     ).then((users) => {
//       console.log(users,"//////////////////////")
//       for(i=0;i<users.length;i++) {
//         mailer.sendCertificate(users[i].name, users[i].email, users[i].certificateLink, req.body.subject, req.body.body)
//       }
//     })
//     res.redirect("/");
// }