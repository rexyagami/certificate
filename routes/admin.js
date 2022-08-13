const express = require("express");
const router = express.Router();
// const uploads = require("../config/s3");
const adminController = require("../controllers/admin")

function isSuperAdmin(req, res, next) {
    if (
        req.user &&
        req.user.role == "superAdmin"
    )
        return next();
    res.redirect("/");
  }
// Create Admin
router.get("/", isSuperAdmin, adminController.GetAdminPage);

// router.get("/:page", isSuperAdmin, adminController.GetAdminPage);

router.get("/users", isSuperAdmin, adminController.GetUsersPage);

// router.get("/users/:page", isSuperAdmin, adminController.GetUsersPage);

module.exports = router;