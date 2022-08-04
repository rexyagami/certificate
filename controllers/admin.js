const csv = require("csvtojson");
const User = require("../models/user");
const Image = require("../models/image");

module.exports.GetAdminIntialPage = (req, res) => {
    res.render("admin");  
}
module.exports.GetAdminPage = (req, res) => {
    res.render("upload", {
        uploadImage: true
    });  
}

module.exports.PostAdminPage = (req, res) => {
    const variableDataObject = JSON.parse(req.body.variableData)
    console.log(req.file);
    if (!req.file) {
            res.status(400).send("nofile");
            console.log(req.file);
            return;
          }
    var imagePath = req.file.location
    Image.create({
        image: imagePath,
        variableData: variableDataObject,
        eventName: req.body.eventName
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
          user.certificateLink = `${process.env.DOMAIN}/user/${user.certificateId}` 
          User.create(user, (err, data) => {
            if (err) {
              console.log(err);
              throw err;
            } else console.log(data);
          });
        }
        // res.redirect("/");res.redirect("back");
      });
      res.redirect(`/admin/mailer/${eventName}`);
  }