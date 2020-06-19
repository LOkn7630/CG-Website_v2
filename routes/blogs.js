const express = require('express');
const router = express.Router();

const authCheck = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('error', 'You need to Login first')
        res.redirect("/auth/login");
    }
}

router.get('/blogs', function (req, res) {
    res.render('blog-home');
});

router.get('/blogs/blog1', function (req, res) {
    res.render('blogs/blog1');
});

router.get('/blogs/blog2', function (req, res) {
    res.render('blogs/blog2');
});
router.get('/blogs/blog3', function (req, res) {
    res.render('blogs/blog3');
});
router.get('/blogs/blog4', function (req, res) {
    res.render('blogs/blog4');
});
router.get('/blogs/blog5', function (req, res) {
    res.render('blogs/blog5');
});
router.get('/blogs/blog6', function (req, res) {
    res.render('blogs/blog6');
});
router.get('/blogs/blog7', function (req, res) {
    res.render('blogs/blog7');
});
router.get('/blogs/blog12', function (req, res) {
    res.render('blogs/blog12');
});

module.exports = router;