const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;

module.exports = function googleOauth2Middleware(req, res, next) {
  passport.authenticate("google", (err, user) => {
    try {
      const token = jwt.sign(
        {
          _id: user._id,
          username: user.google.name,
          avatarUrl: user.google.avatarUrl,
          loginMethod: "google",
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

      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  })(req, res, next);
};
