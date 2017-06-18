var express = require('express');
var User = require('../models/User');
var News = require('../models/News');

var router = express.Router();
var privateKey = require('../modules/crypto').privateKey;

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index',{
        title : '选课管理系统'
    });

    // not available here
    // var uname = req.query.username;
    // var passwd = req.query.password;

    

});

router.get('/signout', function(req, res) {
    delete req.session.loginUser;
    delete req.session.userType;
    req.session.loginUser = null;
    req.session.userType = null;
    res.redirect('/');
});


var User = require('../models/User.js');

router.post('/signin', function (req, res, next) {
    var username = req.body.user.name;
    var password = privateKey.decrypt(req.body.user.password, 'utf8');
    var code = parseInt(req.body.user.code);
    if (req.session.checkcode === code) {
        User.findOne({name: username},function(err,user){
            if (err) {
                console.log(err)
            }
            console.log("sign in user: ");
            console.log(user);
            if (!user) {
                return res.redirect('/')
            }
            user.comparePassword(password,function(err,isMatch){
                if (err) {
                    console.log(err)
                }
                if (isMatch) {
                    console.log('Password matched!');
                    User.getUserType(username,function (err,usertype) {
                        if (usertype == 2){
                            console.log("This is a student!");
                            req.session.loginUser = username;
                            req.session.userType = "student";
                            return res.redirect('/student');
                        }else if(usertype == 1){
                            console.log("This is a teacher!");
                            req.session.loginUser = username;
                            req.session.userType = "teacher";
                            return res.redirect("/teacher");
                        }else if(usertype == 0){
                            console.log("This is an admin!");
                            req.session.loginUser = username;
                            req.session.userType = "admin";
                            return res.redirect("/admin");
                        }
                    });       
                }else{
                    console.log('Password is not matched');
                    return res.redirect('/');
                }
            })
        });
    } else {
        return res.redirect('/');
    }
});

router.post('/news', function(req, res, next) {
    var pageNum = req.body['pageNum'];
    var pageSize = 20;
    News.getAPage(pageNum,pageSize,function(pageResult){
        var result;
        News.getNumberOfPages(pageSize,function(totalPages){
            var head = ['title', 'department', 'createAt', 'content'];
            var title =  ['公告标题','发布单位','发布时间'];
            result = {
                'Title': title,
                'Head': head,
                'Content': pageResult,
                'pageTotal': totalPages
            };
            res.json(result);
        });
    });
});

module.exports = router;
