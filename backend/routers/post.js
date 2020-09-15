const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const requireLogin = require("../middleware/requireLogin");
const mongoose = require("mongoose");
const User = require("../models/user");

mongoose.set("useFindAndModify", false);

router.post("/createpost", requireLogin, (req, res) => {
  const { caption, url } = req.body;
  console.log(caption, url);
  if (!caption || !url) {
    return res.status(422).json({ error: "Plase add all fields" });
  }
  console.log(req.user);
  req.user.password = undefined;
  const post = new Post({
    caption,
    photo: url,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      result;
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/updatedp", requireLogin, (req, res) => {
  const { url } = req.body;
  console.log(url);
  // if (!caption || !url) {
  //   return res.status(422).json({ error: "Plase add all fields" });
  // }
  console.log(req.user);
  req.user.password = undefined;
  // const post = new Post({
  //   caption,
  //   photo: url,
  //   postedBy: req.user,
  // });
  // post
  //   .save()
  User.findByIdAndUpdate(req.user._id, {
    $set: { dp: url },
  })
    .then((result) => {
      result;
      res.json({ user: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/editpost", requireLogin, (req, res) => {
  if (req.body.newcaption === "") {
    return res.status(422).json({ error: "Enter a caption!" });
  }
  if (req.body.newcaption === req.body.editpostcaption) {
    return res.status(422).json({
      error:
        "Are you mad that you are updating the caption with  old caption itself?",
    });
  }
  Post.findByIdAndUpdate(req.body.editpostid, {
    $set: { caption: req.body.newcaption },
  })
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/finaluser", requireLogin, (req, res) => {
  User.findById(req.user._id)
    .select("-password")
    .then((result) => {
      res.json({ user: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/editbio", requireLogin, (req, res) => {
  if (req.body.newbio === "" || req.body.newusername === "") {
    return res.status(422).json({ error: "Enter a bio!" });
  }
  // if (req.body.newbio === req.body.bio) {
  //   return res.status(422).json({
  //     error: "Are you mad that you are updating the bio with old bio itself?",
  //   });
  // }
  console.log(req.user._id);
  console.log(req.body.newbio);
  console.log(req.body.accounttype);
  User.findByIdAndUpdate(req.user._id, {
    $set: {
      bio: req.body.newbio,
      username: req.body.newusername,
      accounttype: req.body.accounttype,
    },
  })
    .then((result) => {
      res.json({ user: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/deletepost/:postId", requireLogin, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
});

router.get("/allpost", requireLogin, (req, res) => {
  // Post.find({ postedBy: { $in: req.user.following } })
  Post.find()
    .populate("postedBy", "_id username dp date")
    .populate("comments.postedBy", "_id username dp")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/mypost", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id username dp date")
    .populate("comments.postedBy", "_id username dp")
    .then((myPost) => {
      if (myPost.length === 0) {
        res.json({ myPost: "No Posts Yet" });
      }
      res.json({ myPost });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/like", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    { new: true }
  )
    .populate("postedBy", "_id username dp")
    .populate("comments.postedBy", "_id username dp")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/save", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { saved: req.user._id },
    },
    { new: true }
  )
    .populate("postedBy", "_id username dp")
    .populate("comments.postedBy", "_id username dp")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/unlike", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    { new: true }
  )
    .populate("postedBy", "_id username dp")
    .populate("comments.postedBy", "_id username dp")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/unsave", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { saved: req.user._id },
    },
    { new: true }
  )
    .populate("postedBy", "_id username dp")
    .populate("comments.postedBy", "_id username dp")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.post("/getlikes", requireLogin, (req, res) => {
  Post.findById(req.body.postId)
    .populate("likes", "username dp")
    .select("likes")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/save", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.body._id,
    {
      $push: { saved: req.body.postId },
    },
    { new: true }
  )
    .populate({
      path: "saved",
      populate: { path: "postedBy", model: "User" },
      populate: { path: "likes", model: "User" },
    })
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/unsave", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.body._id,
    {
      $pull: { saved: req.body.postId },
    },
    { new: true }
  )
    .populate({
      path: "saved",
      populate: { path: "postedBy", model: "User" },
      populate: { path: "likes", model: "User" },
    })

    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/comment", requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  if (req.body.text === "") {
    return res.status(422).json({ error: "Enter a comment!" });
  }
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    { new: true }
  )
    .populate("comments.postedBy", "_id username dp")
    .populate("postedBy", "_id username dp")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.post("/getcomments", requireLogin, (req, res) => {
  Post.findById(req.body.postId)
    .populate("postedBy", "_id username dp")
    .populate("comments.postedBy", " _id username dp")
    .select("comments")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/deletecomment", requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.body._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { comments: comment },
    },
    { new: true }
  )
    .populate("postedBy", "_id username dp")
    .populate("comments.postedBy", "_id username dp")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.patch("/deletecomment", requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.body._id,
    newtext: req.body.newtext,
  };
  const newcomment = {
    postedBy: req.body._id,
    newtext: req.body.newtext,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $set: { comments: comment },
    },
    { new: true }
  )
    .populate("postedBy", "_id username dp")
    .populate("comments.postedBy", "_id username dp")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

module.exports = router;
