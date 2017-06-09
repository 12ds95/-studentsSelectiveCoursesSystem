var express = require('express');
var router = express.Router();
var User = require('../models/User.js');

router.get('/', function (req, res) {
    res.render('login',{});
});

module.exports = router;