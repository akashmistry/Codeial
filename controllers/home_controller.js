// in large scale project controller is set of action
const Post = require("../models/post");

module.exports.home = async function (req, res) {
  // COOKIES WILL COME AS REQ
  //  console.log(req.cookies);

  // COOKIES WILL GO AS RES
  //  res.cookie("something", 20);
  try {
    const posts = await Post.find({})
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      })
      .exec();
    return res.render("home", {
      title: "Codeial | Home",
      posts: posts,
    });
  } catch (err) {
    console.log(err);
  }
};
