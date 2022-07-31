exports.logAllRequests = async (req, res, next) => {
    try {
        const requestData = {
            IP: req.headers["x-forwarded-for"] ? req.headers["x-forwarded-for"] : "",
            time: new Date().toString(),
            NODE_ENV: process.env.NODE_ENV ? process.env.NODE_ENV : "development",
            requestURL: `${req.headers.host}${req.originalUrl}`,
            requestMethod: req.method,
        };
        console.log("Request Data -->", requestData);
        next();
    } catch (err) {
        next();
    }
};
