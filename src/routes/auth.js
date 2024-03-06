const express = require("express");
const router = express.Router();
const authController = require("../app/controllers/authController");
const localStrategyMiddleware = require("../app/middlewares/localStrategyMiddleware");
const googleOauth2Middleware = require("../app/middlewares/googleOauth2Middleware");
const passport = require("passport");
require("../app/services/passport");

router.post("/sign-up", authController.signUp);
router.post("/sign-in", localStrategyMiddleware);

router.get("/google/callback", googleOauth2Middleware);
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get("/", authController.index);
module.exports = router;
