const Comment = require("../models/comments");

const Post = require("../models/post");

module.exports.create = async function (req, res) {
  try {
    const post = await Post.findById(req.body.post);
    if (post) {
      const comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      await post.save();
      req.flash("success", "Comment Published!");

      res.redirect("/");
    }
  } catch (err) {
    req.flash("error", "Comment cannot be Published!");

    console.log(err);
  }
};

module.exports.destroy = async function (req, res) {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.user == req.user.id) {
      let postId = comment.post;

      await comment.deleteOne();

      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      req.flash("success", "Comment Deleted!");

      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", "Comment cannot beDeleted!");

    console.log("Error in finding comment");
    return res.redirect("back");
  }
};
