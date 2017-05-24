var express = require('express');
var router = express.Router();
var User = require('../models/User.js');

router.post('/', function (req, res) {
    var uname = req.body.user.uname;
    var passwd = req.body.user.passwd;
});

module.exports = router;