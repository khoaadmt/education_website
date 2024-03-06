const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const signUp = require("../validations/signUpValidator");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;

class authController {
  index(req, res, next) {
    res.render("auth/index", {
      style: "loginForm.css",
      hiddenHeader: true,
      hiddenFooter: true,
    });
  }
  signUp(req, res, next) {
    try {
      // validate
      const { error } = signUp.validate(req.body);
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.json({ message: errors });
      }

      // check user by email
      User.findOne({ "local.email": req.body.email })
        .lean()
        .then((user) => {
          if (user) {
            return res.json({
              message: "Email đã được đăng ký !",
            });
          }

          bcryptjs.hash(req.body.password, 10).then((hashedPassword) => {
            console.log(req.body);
            // Create user
            User.create({
              local: {
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
              },
            }).then((user) => {
              const token = jwt.sign({ _id: user._id }, KEY_SECRET, {
                expiresIn: "1d",
              });

              res.cookie("token", token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
              });

              return res.json({ message: "Đăng ký thành công" });
            });
          });

          return;
        });
    } catch (err) {
      res.json({
        name: err.name,
        message: err.message,
      });
    }
  }
}
module.exports = new authController();
