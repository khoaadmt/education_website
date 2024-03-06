const Course = require("../models/Course");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
class siteController {
  //GET /
  async index(req, res, next) {
    if (req.cookies.token) {
      try {
        var tokenVerify = jwt.verify(req.cookies.token, KEY_SECRET);
        res.send(tokenVerify);
      } catch (err) {
        console.error(err);
      }
    }
    Course.find({})
      .limit(3)
      .lean()
      .then((courses) => {
        res.render("home", {
          courses,
          style: "style.css",
        });
      })
      .catch(next);
  }

  // GET news/:slug
  seach(req, res) {
    res.render("seach");
  }
}
module.exports = new siteController();
