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
                    //username: username,
                    password: req.body.password,
                    role: "innovator",
                });
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
        { email: req.body.email.toLocaleLowerCase().trim() },
    //   { twoFacAuth: 1, email: 1 }
    ).then((eVinfo) => {
        console.log(eVinfo);
        if (eVinfo) {
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
                                    console.log(eVinfo);
                                    req.login(user, function (err) {
                                        if (err) throw err;
                                        req.session.cookie.maxAge = 10 * 24 * 60 * 60 * 1000;
                                        if (req.user && req.user.role == "superAdmin") {
                                            res.redirect("/admin");
                                        } else {
                                            if (req.query.src) {
                                                res.redirect(`${req.query.src}`);
                                            } else {
                                                res.redirect("/dashboard");
                                            }
                                        }
                                    });
                                }
                            }
                        );
                    } else
                        res.render("auth/login", {
                            err: true,
                            homepage: true,
                        });
                }
            );
        } else {
        res.render("auth/login", {
            err: true,
            homepage: true,
        });
        }
    });
    // res.send("done")
}
    