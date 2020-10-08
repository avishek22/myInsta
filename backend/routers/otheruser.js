const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const requireLogin = require("../middleware/requireLogin");
const Post = require("../models/post");

router.get("/user/:id", requireLogin, (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      Post.find({ postedBy: req.params.id, archive: "no" })
        .populate("postedBy", "_id username dp")
        .populate("comments.postedBy", "_id username dp")
        .sort("-createdAt")
        .exec((err, myPost) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          if (myPost.length === 0 && user.followers.includes(req.user._id)) {
            return res.json({
              myPost: "No Posts Yet",
              user,
              doesfollow: "yes",
            });
          }
          if (myPost.length === 0 && !user.followers.includes(req.user._id)) {
            return res.json({ myPost: "No Posts Yet", user, doesfollow: "no" });
          }
          if (user.followers.includes(req.user._id)) {
            res.json({ user, myPost, doesfollow: "yes" });
          } else {
            res.json({ user, myPost, doesfollow: "no" });
          }
        });
    })
    .catch((e) => {
      return res.status(404).json({ error: "User not found" });
    });
});

router.post("/searchusername", (req, res) => {
  let usernametype = new RegExp("^" + req.body.query);
  User.find({ username: { $regex: usernametype } })
    .select("_id username dp")
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
