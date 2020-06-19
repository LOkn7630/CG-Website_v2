const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

router.get("/signup/", function (req, res) {
  res.render("signup");
});

router.post("/signup/", (req, res) => {
  const { username, email, password, retype } = req.body;

  let errors = [];

  if (!username || !email || !retype || !password) {
    errors.push({ msg: "Please fill all fields" });
  }

  if (password !== retype) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password should be atleast 6 characters" });
  }

  if (errors.length > 0) {
    res.render("signup", { errors, username, email, password, retype });
  } else {
    //Validation passed
    User.findOne({ email: email }, (err, user) => {
      if (user) {
        errors.push({ msg: "Email is already registered" });
        res.render("signup", { errors, username, email, password, retype });
      } else {
        const newUser = new User({ username, email, password });
        //Hash Password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash("success_msg", "Sign Up successful");
                res.redirect("/auth/login");
              })
              .catch((err) => console.error(err));
          })
        );
      }
    });
  }
});

router.get("/login/", function (req, res) {
  res.render("login");
});

router.post(
  "/login/",
  passport.authenticate("local", {
    failureRedirect: "/auth/login/",
    failureFlash: true,
  }),
  (req, res, next) => {
    req.flash("success_msg", "Log In successful!");
    res.redirect("/");
  }
);

router.get("/logout/", function (req, res) {
  req.logout();
  req.flash("success_msg", "Logged you out Successfully");
  res.redirect("/");
});

router.get(
  "/google/",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

//callback route for redirect
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success_msg", "Log In successful!");
    res.redirect("/");
  }
);

module.exports = router;
