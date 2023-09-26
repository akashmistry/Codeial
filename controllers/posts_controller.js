const Post = require("../models/post");

const Comment = require("../models/comments");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    if (req.xhr) {
      return res.status(200).send({
        data: {
          post: post,
          message: "Post created!!",
        },
      });
    }
    req.flash("success", "Post published!");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", err);
    console.log("error in creating post", err);
    return res.redirect("back");
  }
};

module.exports.destroy = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);
    // .id MEANS COMVERTING THE OBJECT ID INTO STRING
    if (post.user == req.user.id) {
      await Post.deleteOne({ _id: req.params.id });
      await Comment.deleteMany({ post: req.params.id });
    }
    if (req.xhr) {
      return res.status(200).json({
        data: {
          post: post,
        },
        message: "Post Deleted!!",
      });
    }

    req.flash("success", "Post Deleted!");

    return res.redirect("back");
  } catch (err) {
    req.flash("error", "unable to delete Post !");

    console.log("error in deleting comment ", err);
    return res.redirect("back");
  }
};
