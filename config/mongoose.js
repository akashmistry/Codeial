const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://akashmistryofficial:03260220@cluster0.vf65ypl.mongodb.net/?retryWrites=true&w=majority"
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connectiing to DB"));

db.once("open", function () {
  console.log("Successfully connected to the database 👻");
});

module.exports = db;
