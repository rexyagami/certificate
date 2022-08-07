const Innovator = require("../models/innovator");

module.exports.ChangeInnovatorRole = (req, res) => {
    Innovator.updateOne(
        {
            "email": req.body.email
        },
        {
            $set: {
                "role": req.body.role
            }
        }
    ).then((doc) => {
        console.log(doc)
        res.send("done")
        // res.redirect("/admin/users")
    }).catch((err) => {
        console.log(err)
        res.redirect("/admin/users")
    })
    

}