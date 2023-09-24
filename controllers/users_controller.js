const User = require("../models/user");

// HOME PAGE CONTROLLER
module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "user profile",
  });
};

// USER SIGN UP CONTROLLER
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Codial sign up",
  });
};

// USER SIGN IN CONTROLLER
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Codial sign in",
  });
};

// GET SIGN UP DATA
module.exports.create = async function (req, res) {
  if (req.body.password !== req.body.confirm_password) {
    return res.redirect("back");
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // IF USER EXISTS
      return res.redirect("back");
    }

    await User.create(req.body);
    return res.redirect("/users/sign-in");
  } catch (err) {
    console.log("Error in creating user:", err);
    return res.redirect("back");
  }
};

// SIGN IN AND CREATE SESSION FOR THE USER
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      // Handle any potential errors
      console.error(err);
    }
  });
  return res.redirect("/");
};
