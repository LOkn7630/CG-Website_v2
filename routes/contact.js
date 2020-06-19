const express = require('express');
const Contact = require('../models/contact');
const contact_mailer = require("../mailer/contact_mailer")
const router = express.Router();

router.post('/message', function (req, res) {
    console.log(req.body);
    contact_mailer.newComment(req.body);
    return res.redirect('back');
});

module.exports = router;
