const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

// AUTHENTICATION USING PASSPORT
passport.use(
  new LocalStrategy(
    {
      // USERNAME FIELD IS SYNTAX
      // EMAIL IS THE KEY WHICH WILL FIND IN THE USER SCHEMA
      usernameField: "email",
    },
    // THIS FUNCTION WILL RUN AUTOMATICALLY
    function (email, password, done) {
      // FIND A USER AND ESTABLISH THE IDENTITY
      User.findOne({ email: email })
        .then((user) => {
          // IF THE USER IS NO PRESENT OR
          // IF THE USER HAS TYPED WRONG PASSWORD
          if (!user || user.password != password) {
            console.log("Invalid Username / Password");
            // NULL MEANS NO ERROR
            // FALSE MEANS THE AUTHENTICATION IS FAILED
            return done(null, false);
          }
          // NULL MEANS NO ERROR
          // user MEANS THE PASSING THE USER COZ AUTHENTICATION IS PASSED
          return done(null, user);
        })
        .catch((err) => {
          console.log("Error in finding user --> Passport");
        });
    }
  )
);

// SERIALIZING THE USER TO DECIDE WHICH KEY IS TO BE KEEPT IN COOKIES
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// DESERIALIZING THE USERS FROM KEY IN THE COOKIES
passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      console.log("Error in finding user-->passport");
    });
});

// USER DEFINED
// CHECK IF THE USER IS AUTHENTICATED
passport.checkAuthentication = function (req, res, next) {
  // IF THE USER IS SIGNED IN THEN PASS ON THE REQUEST TO THE NEXT FUNCTION(CONTROLLER'S ACTION)
  if (req.isAuthenticated()) {
    return next();
  }

  // IF THE USER IS NOT SIGNED IN
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user CONTAINS THE CURRENT SIGNED IN USER FROM THE SESSION COOKIE AND WE ARE JUST SENIDING THIS TO THE LOCALS FOR THE VIEWS
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
