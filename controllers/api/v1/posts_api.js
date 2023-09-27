const Post = require("../../../models/post");
const Comment = require("../../../models/comments");
module.exports.index = async function (req, res) {
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

  return res.json(200, {
    message: "list of posts",
    posts: posts,
  });
};

module.exports.destroy = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      await Post.deleteOne({ _id: req.params.id });
      await Comment.deleteMany({ post: req.params.id });

      return res.json(200, {
        message: "Post and associated comments deleted successfullt",
      });
    } else {
      return res.json(401, {
        message: "You cannot delete this post",
      });
    }
  } catch (err) {
    console.log("********", err);
    return res.json(500, {
      message: "Internal server error",
    });
  }
};
