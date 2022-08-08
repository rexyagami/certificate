const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// const compression = require('compression');
// const helmet = require('helmet');
// const flash = require('connect-flash');

module.exports = (app) => {

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))

    // app.use(compression());
    // app.use(helmet());

    // app.use(flash());

    app.use(function (req, res, next) {
        res.locals.User = req.user;
        // res.locals.Ferror = req.flash("error");
        // res.locals.Fsuccess = req.flash("success");
        next();
    })
};
