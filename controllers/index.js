const csv = require("csvtojson");
const User = require("../models/user");
const Image = require("../models/image");
const Innovator = require("../models/innovator")
const mailer = require("../utils/mail");

module.exports.GetHomePage = (req, res) => {
  if(req.user) {
    const createdBy = req.user._id;
    Image.find(
        {
            createdBy: createdBy
        },{
          variableData: 0, _id: 0
        }
    ).then((img) => {
        // console.log(img)
        // res.render("home", {
        //     img: img
        // });
        Innovator.findOne(
          { _id: createdBy},{
              password: 0,
          }
      ).then((user) => {
          console.log(user)
          res.render("home", {
              user: user,
              img:img
          })
      })
    })  
  } else {
    res.redirect("/auth/login")
  }
}

module.exports.UploadImage = (req, res) => {
  console.log(req.user.role);
   if(req.user.role === 'admin' || req.user.role === 'superAdmin' ){
      res.render("upload", {
          uploadImage: true
      }); 
   } else{
    res.redirect("/")
   }
}

module.exports.PostUploadImage = (req, res) => {
    console.log(req.user._id, req.file)
    const variableDataObject = JSON.parse(req.body.variableData)
    if (!req.file) {
            res.status(400).send("nofile");
            console.log(req.file);
            return;
          }
    var imagePath = `/upload/${req.file.filename}`
    Image.create({
        image: imagePath,
        variableData: variableDataObject,
        eventName: variableDataObject.eventName,
        createdBy: req.user._id 
    }).then((img) => {
        console.log(`Success!\n Image uploaded to ${imagePath}`);
        res.render("upload", {
            uploadImage: false,
            eventName: variableDataObject.eventName,
            // imageId: img._id
        })
    });
}

module.exports.UploadCSV = (req, res) => {
    console.log(req.body)
    const eventName = req.body.eventName
    csv()
      .fromFile(req.file.path)
      .then((jsonObj) => {
        //console.log(jsonObj);
        for (var x = 0; x < jsonObj.length; x++) {
          var user = jsonObj[x];
          user.eventName = eventName
          // user.certificateLink = "https://invinciblenobita.github.io" 
          user.certificateLink = `${process.env.DOMAIN}/user/${eventName}/${user.certificateId}` 
          User.create(user, (err, data) => {
            if (err) {
              console.log(err);
              throw err;
            } else console.log(data);
          });
        }
        // res.redirect("/");res.redirect("back");
      });
      Innovator.findOneAndUpdate(
        {
          "_id": req.user._id
        },
        {
          $push: {
            "eventName": eventName 
          }
        }
      ).then((doc) => {
        console.log(doc)
        res.redirect(`/mailer/${eventName}`);
      }).catch((err) => {
        console.log(err);
        res.redirect(`/mailer/${eventName}`);
      })
  }

module.exports.GetMailerPage = (req, res) => {
    if(((req.user.eventName).includes(req.params.eventName) && req.user.role==="admin")|| req.user.role==="superAdmin"){
      res.render("mailer");  
    }else{
      res.redirect("/")
    }
    
}

module.exports.PostMailerPage = (req, res) => {
    console.log(req.body.body)
    const eventName = req.params.eventName
    User.find(
      {
        "eventName": eventName
      }
    ).then((users) => {
      console.log(users,"//////////////////////")
      for(i=0;i<users.length;i++) {
        mailer.sendCertificate(users[i].name, users[i].email, users[i].certificateLink, req.body.subject, req.body.body)
        console.log(req.body);
      }
    })
    res.redirect("/");
}