const Post = require("../models/post");

const Comment = require("../models/comments");

module.exports.create = async function (req, res) {
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    req.flash("success", "Post Published!");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", "Error in creating post!");
    console.log("error in creating post", err);
    return;
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
    req.flash("success", "Post Deleted!");

    return res.redirect("back");
  } catch (err) {
    req.flash("error", "unable to delete Post !");

    console.log("error in deleting comment ", err);
    return res.redirect("back");
  }
};
