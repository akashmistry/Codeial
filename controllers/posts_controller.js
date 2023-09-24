const Post = require("../models/post");

const Comment = require("../models/comment");

const ObjectId = require("mongodb").ObjectId;

module.exports.create = function (req, res) {
  Post.create({
    content: req.body.content,
    user: req.user._id,
  })
    .then((post) => {
      return res.redirect("back");
    })
    .catch((err) => {
      console.log("Error in creating a post");
    });
};

// module.exports.destroy = function (req, res) {
//   let id = req.params.id;
//   console.log(id);
//   Post.findById(id)
//     // .id MEANS CONVERTING THE OBJECT ID INTO STRING
//     .then((post) => {
//       if (post.user == req.user.id) {
//         Post.deleteOne({ _id: id });
//         Comment.deleteMany({ post: id })
//           .then((post) => {
//             return res.redirect("back");
//           })
//           .catch((err) => {
//             console.log("Error in deleting the comments of the post");
//           });
//       } else {
//         return res.redirect("back");
//       }
//     })
//     .catch((err) => {
//       console.log("Error in fetching post from database");
//       return res.redirect("back");
//     });
// };

module.exports.destroy = async function (req, res) {
  // ID OF THE USER
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    if (post.user == id) {
      await Post.deleteOne({ _id: id });
      await Comment.deleteMany({ post: id });
    }
    return res.redirect("back");
  } catch {
    console.log("Error in fetching post from database");
    return res.redirect("back");
  }
};
