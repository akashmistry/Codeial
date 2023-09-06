const User = require("../models/user.js");
const router = require("../routes");

// HOME PAGE CONTROLLER
module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "Profile",
  });
};

// USER SIGN UP CONTROLLER
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Codeial| Sign up",
  });
};

// USER SIGN IN CONTROLLER
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Codeial| Sign in",
  });
};

// GET SIGN UP DATA
module.exports.create = function (req, res) {
  console.log(req.body);
  if (req.body.password != req.body.confirm_password) {
    console.log("WRONG PASS");
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        User.create(req.body)
          .then((user) => {
            res.redirect("/users/sign-in");
          })
          .catch((err) => {
            console.log("Error in fining user in signing up");
          });
      } else {
        res.redirect("back");
      }
    })
    .catch((err) => {
      console.log("Error in fining user in signing up");
    });
};

// SIGN IN AND CREATE SESSION FOR THE USER
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.redirect("/");
  });
};
