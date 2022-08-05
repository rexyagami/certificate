module.exports = (req, res, next) => {
  const origin = req.headers.origin;

  const index = process.env.WHITELIST_DOMAINS.split(",").indexOf(origin);

  // if (index > -1) {
  //     res.header("Access-Control-Allow-Origin", origin);
  // }

  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,PATCH,DELETE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Accept,Authorization"
  );

  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
};
