const express = require("express");

const Router = express.Router();

const homeController = require("../controllers/home_controller");

console.log("router loaded");

Router.get("/", homeController.home);

Router.use("/users", require("./users"));

Router.use("/posts", require("./posts"));

Router.use("/comments", require("./comments"));

// API
Router.use("/api", require("./api"));

module.exports = Router;
