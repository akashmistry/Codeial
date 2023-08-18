const express = require("express");

// ROUTE HANDLER
const router = express.Router();
const homeController = require("../controllers/home_controller");
console.log("Router Loaded");

router.get("/", homeController.home);
router.use("/users", require("./users"));
router.use("/posts", require("./posts"));

// FOR ANY FURTHER ROUTES, ACCESS FROM HERE
// router.use("/routerName", require("./routerFile"))

module.exports = router;
