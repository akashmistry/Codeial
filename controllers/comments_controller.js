const Comment = require("../models/comments");

const Post = require("../models/post");

const commentsMailer = require("../mailers/comments_mailer");

module.exports.create = async function (req, res) {
  try {
    const post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      post.save();

      comment = await comment.populate("user", "name email");
      commentsMailer.newComment(comment);

      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment: comment,
          },
          message: "Post created!",
        });
      }

      req.flash("success", "Comment Published!");

      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    req.flash("error", err);
  }
};

module.exports.destroy = async function (req, res) {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.user == req.user.id) {
      let postId = comment.post;

      await comment.deleteOne();
      const post = await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment_id: req.params.id,
          },
          message: "Post deleted",
        });
      }

      req.flash("success", "Comment Deleted!");

      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error in finding comment");
    req.flash("error", "Comment cannot beDeleted!");
    return res.redirect("back");
  }
};
