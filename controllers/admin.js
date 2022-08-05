const csv = require("csvtojson");
const User = require("../models/user");
const Image = require("../models/image");
const mailer = require("../utils/mail");

module.exports.GetAdminPage = (req, res) => {
    var email = "manish@hack2skill.com";
    if(req.user) email = req.user.email;
    Image.find(
        {
            email: email
        }
    ).then((img) => {
        res.render("admin/admin", {
            img: img
        });
    })
    
    
}
module.exports.GetUsersPage = (req, res) => {
    Image.find().then((img) => {
        res.render("admin/allCertificates", {
            img: img
        }); 
    }) 
}

// module.exports.UploadImage = (req, res) => {
//     res.render("upload", {
//         uploadImage: true
//     });  
// }

// module.exports.PostUploadImage = (req, res) => {
//     const variableDataObject = JSON.parse(req.body.variableData)
//     console.log(req.file);
//     if (!req.file) {
//             res.status(400).send("nofile");
//             console.log(req.file);
//             return;
//           }
//     var imagePath = req.file.location
//     Image.create({
//         image: imagePath,
//         variableData: variableDataObject,
//         eventName: req.body.eventName
//     }).then((img) => {
//         console.log(`Success!\n Image uploaded to ${imagePath}`);
//         res.render("upload", {
//             uploadImage: false,
//             eventName: variableDataObject.eventName,
//             // imageId: img._id
//         })
//     });
// }

//     });  
// }

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