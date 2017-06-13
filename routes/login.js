var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
var   Teacher = require('../models/Teacher')
    , Student = require('../models/Student')
;

router.post('/', function (req, res) {
    var uname = req.body.user.uname;
    var passwd = req.body.user.passwd;
    var usertype = User.getUserType(uname);
    if (usertype == 2){
        console.log("This is a student!");
    }else if(usertype == 1){
        console.log("This is a teacher!");
    }
});

router.get('/', function (req, res) {
    res.render('login',{});
});

module.exports = router;