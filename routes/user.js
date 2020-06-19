const express = require("express");
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");
const router = express.Router();

const User = require("../models/user");

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: "./public/images/users",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("myImage");

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

const authCheck = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/auth/login");
  }
};

router.get("/profile/:user_id", authCheck, (req, res) => {
  res.render("profile", { user: req.user });
});

router.post("/profile/:user_id/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render("profile", {
        msg: err,
      });
    } else {
      if (req.file == undefined) {
        res.render("profile", {
          msg: "Error: No File Selected!",
        });
      } else {
        User.findById(req.params.user_id, (err, foundUser) => {
          if (err) {
            console.log(err);
          } else {
            foundUser.thumbnail = `../images/users/${req.file.filename}`;
            foundUser.save();

            // res.render("profile", {
            //   user: foundUser,
            // });
            res.redirect("/profile/" + req.params.user_id);
            //res.redirect("/");
          }
        });
      }
    }
  });
});

//middleware

module.exports = router;
