var express = require('express');
var User = require('../models/User');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index',{
        title : 'Login'
    });
    var uname = req.query.username;
    var passwd = req.query.password;

    User.getUserType(uname,function (err,usertype) {
        if (usertype == 2){
            console.log("This is a student!");
        }else if(usertype == 1){
            console.log("This is a teacher!");
        }
    });

});

router.post('/', function (req, res) {
    var uname = req.body.username;
    var passwd = req.body.password;
    var usertype = User.getUserType(uname);

    if (usertype == 2){
        console.log("This is a student!");
    }else if(usertype == 1){
        console.log("This is a teacher!");
    }
});
module.exports = router;
