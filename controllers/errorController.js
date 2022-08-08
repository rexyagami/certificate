const ERRORS = require("../constants/errors");

exports.notFound = (req, res, next) => {
    try {
        // return res.json(ERRORS.NOT_FOUND);
        return res.render("404");
    } catch (err) {
        next(err);
    }
};

exports.somethingWentWrong = (err, req, res, next) => {
    try {
        console.log(err);
        if (err.code === 11000) {
            const keys = Object.keys(err.keyPattern);
            if (keys && keys.length) {
                return res.json({
                    success: false,
                    message: `${[keys[0]]} already exist`,
                });
            }
        }
        return res.json(ERRORS.SERVER_ERROR);
    } catch (err) {
        console.log(err);
        return res.json(ERRORS.SERVER_ERROR);
    }
};
