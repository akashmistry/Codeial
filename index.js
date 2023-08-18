// REQUIRING THE EXPRESS FRAMEWORK
const express = require("express");
const app = express();
const port = 2620;

// USING EXPRESS ROUTER
app.use("/", require("./routes"));

// SETTING THE VIEW ENGINE
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (err) {
  if (err) {
    console.log("Oops error in running the sever:", err);
    return;
  }
  console.log("🔥Firing up the Express server on: ", port, "🤙🏻");
});
