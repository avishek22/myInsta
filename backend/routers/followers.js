const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const requireLogin = require("../middleware/requireLogin");

router.put("/followrequest/:id", requireLogin, (req, res) => {
  console.log(req.user._id);
  User.findByIdAndUpdate(req.params.id, {
    $push: { followrequest: req.user._id },
  })
    .then((result) => {
      res.json({ user: result });
    })
    .catch((e) => {
      res.json({ error: e });
    });
});

router.get("/showfollowing", requireLogin, (req, res) => {
  console.log(req.user._id);
  User.findById(req.user._id)
    .select("following")
    .populate("following", "_id username dp")
    .then((result) => {
      res.json({ user: result });
    })
    .catch((e) => {
      res.json({ error: e });
    });
});

router.get("/showfollowers", requireLogin, (req, res) => {
  console.log(req.user._id);
  User.findById(req.user._id)
    .select("followers")
    .populate("followers", "_id username dp")
    .then((result) => {
      res.json({ user: result });
    })
    .catch((e) => {
      res.json({ error: e });
    });
});

router.get("/showfollowrequest", requireLogin, (req, res) => {
  console.log(req.user._id);
  User.findById(req.user._id)
    .select("followrequest")
    .populate("followrequest", "_id username dp")
    .then((result) => {
      res.json({ user: result });
    })
    .catch((e) => {
      res.json({ error: e });
    });
});

router.put("/addfollower", requireLogin, (req, res) => {
  console.log(req.user._id);
  console.log(req.body._id);
  User.findByIdAndUpdate(
    req.user._id,
    {
      $push: { followers: req.body._id },
      $pull: { followrequest: req.body._id },
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(req.body._id, {
        $push: { following: req.user._id },
      })
        .then((result) => {
          res.json({ user: result });
        })
        .catch((e) => {
          res.status(422).json({ error: e });
        });
    }
  );
});

router.put("/removefollower", requireLogin, (req, res) => {
  // console.log(req.user._id);
  console.log(req.body._id);
  User.findByIdAndUpdate(req.user._id, {
    $pull: { followers: req.body._id, followrequest: req.body._id },
  })
    .then((result) => {
      res.json({ user: result });
    })
    .catch((e) => {
      res.json({ error: e });
    });
});

router.put("/deleterequest/:id", requireLogin, (req, res) => {
  console.log(req.user._id);
  console.log(req.body._id);
  User.findByIdAndUpdate(req.params.id, {
    $pull: { followers: req.user._id, followrequest: req.user._id },
  })
    .then((result) => {
      res.json({ user: result });
    })
    .catch((e) => {
      res.json({ error: e });
    });
});

router.put("/unfollow/:id", requireLogin, (req, res) => {
  console.log(req.user._id);
  console.log(req.body._id);
  User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { following: req.params.id, followrequest: req.params.id },
    },
    (err, result) => {
      if (err) {
        res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(req.params.id, {
        $pull: { followers: req.user._id },
      })
        .then((result) => {
          res.json({ user: result });
        })
        .catch((e) => {
          res.status(422).json({ error: e });
        });
    }
  );
});

router.get("/followunfollow/:id", requireLogin, (req, res) => {
  console.log(req.user._id);
  console.log(req.body._id);
  User.findById(req.params.id)
    .then((result) => {
      if (result.followrequest.includes(req.user._id)) {
        res.json({ user: result, button: "Delete Request" });
      }
      if (result.followers.includes(req.user._id)) {
        res.json({ user: result, button: "Unfollow" });
      } else {
        res.json({ user: result, button: "Follow" });
      }
    })
    .catch((e) => {
      res.json({ error: e });
    });
});

module.exports = router;
