const csv = require("csvtojson");
const User = require("../models/user");
const Innovator = require("../models/innovator");
const Image = require("../models/image");
const mailer = require("../utils/mail");

module.exports.GetAdminPage = async (req, res) => {
    if(req.user) {
        const page = req.params.page || 1;
        const limit = 10;
        var count = await Image.count();
        Image.find({},{
            variableData: 0, _id: 0
        }).sort({ "timestamp" : -1}).skip(limit*page).limit(10).then((img) => {
            // console.log(img)
            // res.render("admin/admin", {
            //     img: img
            // }); 
            Innovator.find(
                {},{
                    password: 0,
                }
            ).then((users) => {
                console.log(users)
                res.render("admin/admin", {
                    users: users,
                    img:img,
                    count: count
                })
            })
        }) 
    } else {
        res.redirect("/")
    }
}
module.exports.GetUsersPage = (req, res) => {
    Innovator.find(
        {
            $or: 
            [
                {
                    "role" : "innovator" 
                },
                {
                    "role": "admin"
                }
            ]
            
        },{
            _id: 0, password: 0,
        }
    ).then((users) => {
        console.log(users)
        res.render("admin/users", {
            users: users
        })
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