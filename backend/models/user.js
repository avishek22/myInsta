const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: "Hello guys",
  },
  dp: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRk8cyUrYvHcRDy0ogeHCORJ4TnGpXq1PYpwQ&usqp=CAU",
  },
  saved: [{ type: mongoose.Schema.Types.ObjectID, ref: "Post" }],
  accounttype: {
    type: String,
    default: "Public",
  },
  followrequest: [{ type: mongoose.Schema.Types.ObjectID, ref: "User" }],
  followers: [{ type: mongoose.Schema.Types.ObjectID, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectID, ref: "User" }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
