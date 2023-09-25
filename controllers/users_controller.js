const User = require("../models/user");

// HOME PAGE CONTROLLER
module.exports.profile = async function (req, res) {
  const user = await User.findById(req.params.id);
  return res.render("user_profile", {
    title: "User profile",
    profile_user: user,
  });
};

// UPDATE PROFILE CONTROLLER

module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    return res.redirect("back");
  } else {
    res.status(401).send("Unauthorized");
  }
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
