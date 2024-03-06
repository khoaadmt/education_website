const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const signIn = require("../validations/signInValidator");

passport.use(
  new LocalStrategy(async function (username, password, done) {
    User.findOne({ "local.email": username })
      .lean()
      .then(function (user) {
        if (!user) {
          return done(null, false);
        }
        if (!bcryptjs.compare(password, user.local.password)) {
          return done(null, false);
        }
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  })
);
module.exports = function passportMiddleware(req, res, next) {
  const { error } = signIn.validate(req.body);
  if (error) {
    const errors = error.details.map((err) => err.message);
    return res.json(errors);
  }

  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (!user) {
      return res.json("user name or password incorrect");
    }
    try {
      const token = jwt.sign(
        {
          _id: user._id,
          username: user.local.username,
          avatar: user.local.avatar,
          loginMethod: "local",
        },
        KEY_SECRET,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json("success");
    } catch (err) {
      res.send(err);
    }
  })(req, res, next);
};
