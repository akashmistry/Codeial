const User = require("../models/user.js");
const router = require("../routes");

// HOME PAGE CONTROLLER
module.exports.profile = function (req, res) {
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id)
      .then((user) => {
        if (user) {
          return res.render("user_profile", {
            title: "User Profile",
            user: user,
          });
        } else {
          return res.redirect("/users/sign-in");
        }
      })
      .catch((err) => {
        console.log("Error in fetching the cookie_id from Database:", err);
      });
  } else {
    return res.redirect("/users/sign-in");
  }
};

// USER SIGN UP CONTROLLER
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Codeial| Sign up",
  });
};

// USER SIGN IN CONTROLLER
module.exports.signIn = function (req, res) {
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
  // FIND THE USER
  User.findOne({ email: req.body.email })
    // HANDLE USER FOUND
    .then((user) => {
      if (user) {
        // HANDLE MISSMATCHING OR PASSWORDS WHICH DONT MATCH
        if (user.password != req.body.password) {
          return res.redirect("back");
        }
      } else {
        // HANDLE USER NOT FOUND
        return res.redirect("back");
      }
      // HANDLE SESSION CREATING
      res.cookie("user_id", user.id);
      return res.redirect("/users/profile");
    })
    .catch((err) => {
      console.log("Error in finding the user in the Database: ", err);
    });
};
