const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
  },

  photo: {
    type: String,
    required: true,
  },
  postedBy: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
  likes: [{ type: mongoose.Schema.Types.ObjectID, ref: "User" }],
  comments: [
    {
      text: String,
      postedBy: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    },
  ],
  date: {
    type: String,
    default: `${new Date().getDate()}/${
      new Date().getMonth() + 1
    }/${new Date().getFullYear()}`,
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
