const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const requireLogin = require("../middleware/requireLogin");

router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  if (!email || !password || !username) {
    return res.status(422).json({ error: "Please add all the fields!" });
  }

  User.findOne({ email: email } || { username: username })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "Email already exists!" });
      }
      // User.findOne({ username: username }, function (found) {
      //   if (found) {
      //     return res.status(422).json({ error: "Username already exists!" });
      //   }
      // });

      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          email,
          password: hashedPassword,
          username,
        });
        user
          .save()
          .then((user) => {
            res.json({ message: "Account Signed In!", user });
          })
          .catch((e) => {
            res.send(e);
          });
      });
    })
    .catch((e) => {
      res.send(e);
    });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Enter all fileds!" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: "Invalid credentials!" });
      }
      bcrypt
        .compare(password, savedUser.password)
        .then((match) => {
          if (match) {
            // res.send("Logged In");
            const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
            const {
              _id,
              username,
              email,
              bio,
              dp,
              followers,
              following,
            } = savedUser;
            res.json({
              token,
              user: { _id, username, email, bio, dp, followers, following },
            });
          } else {
            return res.status(422).json({ error: "Invalid password!" });
          }
        })
        .catch((e) => {
          res.send(e);
          console.log(e);
        });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.put("/ownid", (req, res) => {
  User.findByIdAndUpdate(req.body._id, {
    $push: { following: req.body._id },
  })
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      res.json(e);
    });
});
module.exports = router;
