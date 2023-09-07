// REQUIRING THE FRAMEWORKS
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const port = 2620;

const db = require("./config/mongoose");

// USED FOR SESSION COOKIE
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo");

const sassMiddleware = require("node-sass-middleware");

app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "expanded",
    prefix: "/css",
  })
);

// READING THROUGH THE POST REQUEST
app.use(express.urlencoded({ extended: true }));

// USING THE COOKIE PARSER
app.use(cookieParser());

// PATH FOR ASSETS
app.use(express.static(path.join(__dirname, "assets")));

app.use(expressLayouts);

// EXTRACTING THE LINK AND SCRIPT TAGS
// PUTTING IT IN THE LAYOUT HEAD AND BOTTOM OF BODY
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// SETTING THE VIEW ENGINE
app.set("view engine", "ejs");
app.set("views", "./views");

// MONGO STORE IS USED TO STORE THE SESSION COOKIE IN THE DB
app.use(
  session({
    name: "codeial",
    // TODO CHANGE THE SECRET BEFORE DEPLOYMENT IN PRODUCTION MODE
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost/codeial",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongo setup ok");
      }
    ),
    // store: new MongoStore(
    //   {
    //     mongooseConnection: db,
    //     autoRemove: "disabled",
    //   },
    //   function (err) {
    //     console.log(err || "connect-mongo setup ok");
    //   }
    // ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
// INDEX ROUTE
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("Oops error in running the sever:", err);
    return;
  }
  console.log("🔥Firing up the Express server on: ", port, "🤙🏻");
});
