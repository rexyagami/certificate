const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const indexRoutes = require("../routes/index");
const userRoutes = require("../routes/user");
const apiRoutes = require("../routes/api");
const adminRoutes = require("../routes/admin")
const authRoutes = require("../routes/auth")

const errorController = require("../controllers/errorController");
const logController = require("../controllers/logController");

const corsConfig = require("./cors");

module.exports = (app) => {
  app.use(express.static(path.join(__dirname, "../public")));
  app.use(express.static(path.join(__dirname, "../oldpublic")));
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "ejs");

  // Middlewares
  app.use(express.json());
  app.use(cookieParser());

  // CORS
  app.use(corsConfig);

  // Log All Requests
  app.use(logController.logAllRequests);

  // API Routes
  app.use("/", indexRoutes);
  app.use("/user", userRoutes);
  app.use("/admin", adminRoutes);
  app.use("/api", apiRoutes);
  app.use("/auth", authRoutes);

  // Error Handlers
  app.use(errorController.notFound);
  app.use(errorController.somethingWentWrong);
};
