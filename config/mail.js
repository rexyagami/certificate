const nodemailer = require("nodemailer");

const Transporter = nodemailer.createTransport({
  host: process.env.HOSTEM,
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAILADDR,
    pass: process.env.EMAILPASS,
  },
});

// const TransporterSecond = nodemailer.createTransport({
//   host: process.env.HOSTEM_TWO,
//   port: 587,
//   secure: false,
//   requireTLS: true,
//   auth: {
//     user: process.env.EMAILADDR_TWO,
//     pass: process.env.EMAILPASS_TWO,
//   },
// });

module.exports = { Transporter };
