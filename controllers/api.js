const Innovator = require("../models/innovator");
const mailer = require("../utils/mail");

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

module.exports.RequestAccess  = (req, res) => {
    Innovator.find(
        {
            "role": "superAdmin"
        }
    ).then((docs) => {
        console.log(docs)
        for(i=0;i<docs.length;i++) {
            // const link if we want to generate a link 
            mailer.requestAccess(docs[i].name, docs[i].email, req.body.name, req.body.email)
        }
        Innovator.findOneAndUpdate(
            {
                "email": req.body.email
            },
            {
                $set: {
                    "requestAccess": true
                }
            }
        ).then((doc) => {
            res.send("done")
        // res.redirect("/admin/users")
        }).catch((err) => {
            console.log(err)
            res.redirect("/")
        })
    }).catch((err) => {
        console.log(err)
        res.redirect("/")
    })
    

}