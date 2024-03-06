const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20");
const { GOOGLE_CLIENT_ID } = process.env;
const { GOOGLE_CLIENT_SECRET } = process.env;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      //Check if google profile exist.
      try {
        if (profile.id) {
          User.findOne({ "google.googleId": profile.id })
            .lean()
            .then((existingUser) => {
              if (existingUser) {
                done(null, existingUser);
              } else {
                new User({
                  google: {
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    avatarUrl: profile.photos[0].value,
                  },
                })
                  .save()
                  .then((user) => done(null, user));
              }
            });
        }
      } catch (err) {
        console.log("here");
        console.log(err);
      }
    }
  )
);
