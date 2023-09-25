const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/codeial");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connectiing to DB"));

db.once("open", function () {
  console.log("Successfully connected to the database 👻");
});

module.exports = db;
