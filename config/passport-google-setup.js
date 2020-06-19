const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("./keys");
const User = require("../models/user");

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        callbackURL: "/auth/google/redirect",
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ email: profile.emails[0].value }, (err, currUser) => {
          if (err) {
            done(err);
          }

          if (currUser) {
            if (currUser.password) {
              //console.log('user created through local strategy')
              console.log(currUser.googleId);
              done(null, false, { message: "Cannot login using Google" });
            } else {
              //console.log('user exists')
              done(null, currUser);
            }
          } else {
            User.create(
              {
                username: profile.displayName,
                googleId: profile.id,
                thumbnail: profile._json.picture,
                email: profile.emails[0].value,
              },
              (err, user) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(user);
                  done(null, user);
                }
              }
            );
          }
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
