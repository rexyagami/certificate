const Image = require("../models/image");

module.exports.GetAdminPage = (req, res) => {
    res.render("upload", {
        uploadImage: true
    });  
}

module.exports.PostAdminPage = (req, res) => {
    console.log(req.body)
    console.log(req.file);
    if (!req.file) {
            res.status(400).send("nofile");
            console.log(req.file);
            return;
          }
    var imagePath = req.file.location
    Image.create({
        image: imagePath,
        variableData: req.body.variableData,
        eventName: req.body.eventName
    });

    console.log(`Success!\n Image uploaded to ${imagePath}`);

    res.render("upload", {
        uploadImage: false,
      imagePath: imagePath,
      variableData: req.body.variableData
    })
    // CreateHackathon.updateOne(
    //     { hackathonName: req.body.hackName },
    //     {
    //     $set: {
    //         restrictions: {
    //         email: true,
    //         },
    //     },
    //     },
    //     { upsert: false, multi: true }
    // ).then((c) => {
        // console.log(c);
        // res.send({ status: "success", code: "done" });
    // });
}