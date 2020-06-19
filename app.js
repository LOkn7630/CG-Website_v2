const express = require("express");
const app = express();
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");

const keys = require("./config/keys");

const contactRoute = require("./routes/contact");
const homeRoute = require("./routes/home");
const blogRoute = require("./routes/blogs");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

const PORT = process.env.PORT || 3000;
var mongodb = keys.mongodb.url;

require("./config/passport-google-setup")(passport);
require("./config/passport-local-setup")(passport);

mongoose.connect(mongodb, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "views"));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "Once again Rusty wins cutest dog!",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.message = req.flash("error");
  next();
});

app.use("/contact/", contactRoute);
app.use("/", homeRoute);
app.use("/", blogRoute);
app.use("/auth/", authRoute);
app.use("/", userRoute);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
