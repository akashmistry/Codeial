const Post = require("../models/post");

module.exports.home = function (req, res) {
  // COOKIES WILL COME AS REQ
  console.log(req.cookies);

  // COOKIES WILL GO AS RES
  res.cookie("something", 20);

  // Post.find({});

  Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .then((posts) => {
      return res.render("home", {
        title: "Home",
        posts: posts,
      });
    })
    .catch((err) => {
      console.log("Error in fetching the posts");
    });
};
