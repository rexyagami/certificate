const Innovator = require("../models/innovator")

module.exports.GetSignUpPage = (req, res) => {
    res.render("auth/signup")
}

module.exports.PostSignUpPage = (req, res) => {
    console.log(req.body);
    Innovator.findOne(
        {
            email: req.body.email,
        },
    ).then((err, user) => {
        if (err) throw err;
        if (user) res.redirect("/");
        else {
            let username =
            req.body.email.split("@")[0].toLocaleLowerCase() +
            Math.floor(1000 + Math.random() * 9000);
            // secretToken = randomstring.generate();
            //console.log(req.body);
            if (req.body.password !== req.body.confirmpassword) {
                res.redirect("/auth/signup");
            } else {
                var newUser = new Innovator({
                    email: req.body.email.toLocaleLowerCase(),
                    name: req.body.name,
                    password: req.body.password,
                    role: "innovator",
                });
                if(process.env.SUPERADMINS.includes(newUser.email)) newUser.role = "superAdmin";
                Innovator.createInnovator(newUser, (err, user) => {
                    if (err) throw err;
                    console.log(user);
                    req.login(newUser, function (err) {
                        if (err) {
                            console.log(err)
                            res.redirect("/")
                        }
                            
                        req.session.cookie.maxAge = 10 * 24 * 60 * 60 * 1000;
                        if (req.query.src) {
                            res.redirect(`${req.query.src}`);
                        } else {
                            res.redirect("/");
                        }
                    });
                });
            }
        };
    }).catch((err) => {
        console.log(err);
        res.redirect("/auth/signup")
    });
}
            

module.exports.GetLoginPage = (req, res) => {
    res.render("auth/login")
}

module.exports.PostLoginPage = (req, res) => {
    Innovator.findOne(
        {
            email: req.body.email.toLocaleLowerCase(),
        },
        (err, user) => {
            if (err) throw err;
            if (user) {
                Innovator.comparePassword(
                    req.body.password,
                    user.password,
                    function (err, isMatch) {
                        if (err) throw err;
                        // || req.body.password === 'IncubateInd@2020#'
                        if (isMatch) {
                            req.login(user, function (err) {
                                if (err) throw err;
                                req.session.cookie.maxAge = 10 * 24 * 60 * 60 * 1000;
                                if (req.user && req.user.role == "superAdmin") {
                                    res.redirect("/admin");
                                } else {
                                    if (req.query.src) {
                                        res.redirect(`${req.query.src}`);
                                    } else {
                                        res.redirect("/");
                                    }
                                }
                            });
                        } else {
                            res.render("auth/login", {
                                err: true,
                                homepage: true,
                            });
                        }
                    }
                );
            } else
                res.render("auth/signup", {
                    err: true,
                    homepage: true,
                });
        }
    );
    // res.send("done")
}

module.exports.Logout = (req, res) => {
  if (req.user) {
    console.log("Success logout", req.user);
    req.logOut((err) => {
        if (err) {
            console.log(err);
            res.send("error")
        }
    })
    req.session.destroy(function (err) {
        res.send("done") //Inside a callback??? bulletproof!
    });
  } else {
    res.send("done")
  }
};

    