require("dotenv").config({ path: __dirname + "/.env" });

//**************************************************
//Express Setup
//**************************************************

const express = require("express");
const app = express();

//**************************************************
//Database Setup
//**************************************************

const connectDB = require("./config/databaseSetup");
connectDB();

//**************************************************
//Authentication & Session Management
//**************************************************

// const passport = require("passport");
// require("./config/session")(app, passport);
// require("./config/passport")(passport);

//**************************************************
//Middleware
//**************************************************

require("./config/middlewares")(app);

//**************************************************
//Setting Up Express
//**************************************************

require("./config/express")(app);

module.exports = app;