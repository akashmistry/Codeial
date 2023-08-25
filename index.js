// REQUIRING THE FRAMEWORKS
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const port = 2620;

const db = require("./config/mongoose");
app.use(expressLayouts);

// PATH FOR ASSETS
app.use(express.static(path.join(__dirname, "assets")));

// EXTRACTING THE LINK AND SCRIPT TAGS
// PUTTING IT IN THE LAYOUT HEAD AND BOTTOM OF BODY
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// READING THROUGH THE POST REQUEST
app.use(express.urlencoded({ extended: true }));

// USING THE COOKIE PARSER
app.use(cookieParser());

// SETTING THE VIEW ENGINE
app.set("view engine", "ejs");
app.set("views", "./views");

// INDEX ROUTE
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("Oops error in running the sever:", err);
    return;
  }
  console.log("🔥Firing up the Express server on: ", port, "🤙🏻");
});
