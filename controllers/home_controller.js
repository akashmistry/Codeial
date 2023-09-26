// in large scale project controller is set of action
const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  // COOKIES WILL COME AS REQ
  //  console.log(req.cookies);

  // COOKIES WILL GO AS RES
  //  res.cookie("something", 20);
  try {
    const posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      })
      .exec();
    const users = await User.find({});
    return res.render("home", {
      title: "Codeial | Home",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log(err);
  }
};
