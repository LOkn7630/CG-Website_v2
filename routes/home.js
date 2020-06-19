const express = require('express');
const router = express.Router();
const iitData = require("./IIT.json")
const nitData = require("./NITS.json")
const authCheck = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('error', 'You need to Login first')
        res.redirect("/auth/login");
    }
}

router.get('/', function (req, res) {
    return res.render('home');
});

router.get('/profile/', (req, res) => {
    res.render('profile', { user: req.user })
})

router.get('/contact', (req, res) => {
    res.render('contact-us')
})

router.get('/services', (req, res) => {
    res.render('services')
})

router.get('/mentor', (req, res) => {
    res.render('mentor')
})

router.get('/mentor/get', (req, res) => {
    res.render('mentor-page')
})

router.get('/about', (req, res) => {
    res.render('about')
})

router.get('/predictor-advanced', (req, res) => {
    res.render('predictor')
})

router.get('/predictor-mains', (req, res) => {
    res.render('predictor-mains')
})

router.post('/predictor-advanced', (req, res) => {
    //var { rank, category, seatPool } = req.body;

    var rank = req.body.rank;
    var category = req.body.category;
    var seatPool = req.body.seatPool;

    function compare(a, b) {
        const bandA = Number(a["Openning Rank"]);
        const bandB = Number(b["Openning Rank"]);

        let comparison = 0;
        if (bandA > bandB) {
            comparison = 1;
        } else if (bandA < bandB) {
            comparison = -1;
        }
        return comparison;
    }

    var newData = iitData.filter((element) => {
        return (Number(element["Closing Rank"]) >= Number(rank) && element["Category"] == category && element["Seat Pool"] == seatPool)
    })

    newData.sort(compare)

    res.render("predictor-result", { data: newData });
})

router.post('/predictor-mains', (req, res) => {
    //var { rank, category, seatPool } = req.body;

    var rank = req.body.rank;
    var category = req.body.category;
    var seatPool = req.body.seatPool;

    function compare(a, b) {
        const bandA = Number(a["Openning Rank"]);
        const bandB = Number(b["Openning Rank"]);

        let comparison = 0;
        if (bandA > bandB) {
            comparison = 1;
        } else if (bandA < bandB) {
            comparison = -1;
        }
        return comparison;
    }

    var newData = nitData.filter((element) => {
        return (Number(element["Closing Rank"]) >= Number(rank) && element["Category"] == category && element["Seat Pool"] == seatPool)
    })

    newData.sort(compare)

    res.render("predictor-mains-result", { data: newData });
})

module.exports = router;