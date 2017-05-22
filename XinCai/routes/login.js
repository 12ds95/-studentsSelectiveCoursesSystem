var express = require('express');
var router = express.Router();
var User = require('../models/User.js');

var caixin = new User({UserId: 'caixin', Password: 'caixin', Type: 'Stu'});
caixin.save(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Insert success!');
    }
});
router.post('/', function (req, res) {
    var id = req.body.UserId;
    var pw = req.body.Password;
    if (id !== 'undefined') { // 已经存在的电影数据
        User.findById(id, function (err, User) {
            if (err || User._doc.Password !== pw) {
                res.redirect('/');
                console.log(err);
            } else {
                res.redirect('/users');
            }
        });
    } else {
        res.redirect('/');
    }

});

module.exports = router;