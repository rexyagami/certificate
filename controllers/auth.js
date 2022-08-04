module.exports.GetSignUpPage = (req, res) => {
    res.render("auth/signup")
}

module.exports.PostSignUpPage = (req, res) => {
    res.send("done")

}

module.exports.GetLoginPage = (req, res) => {
    res.render("auth/login")
}

module.exports.PostLoginPage = (req, res) => {
    res.send("done")
}