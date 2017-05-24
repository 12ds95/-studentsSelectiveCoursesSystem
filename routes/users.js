var express = require('express');
var router = express.Router();
var User = require('../models/User.js');

/* GET users listing. */
//signup
router.post('/signup',function(req,res){
    var _user = req.body.user;
    //var user = new User(_user)
    // console.log(user)
    User.findByName(_user.name,function(err,user){
        if (err) {
            console.log(err)
        }
        if (user) {
            console.log(user+'Already exist')
            return res.redirect('/')
        }else{
            var user = new User(_user)
            user.save(function(err,user){
                if (err) {
                    console.log(err)
                }
                res.redirect('/')

            })
        }
    });

    // user.save(function(err){
    // 	if (err) {console.log('app.js: user.save\n'+err)}
    // 	res.redirect('/')
    // })
});

//signin
// http://www.imooc.com/video/3781
router.post('/signin',function(req,res){
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;

    User.findOne({name: name},function(err,user){
        if (err) {
            console.log(err)
        }
        if (!user) {
            return res.redirect('/')
        }
        user.comparePassword(password,function(err,isMatch){
            if (err) {
                console.log(err)
            }
            if (isMatch) {
                console.log('matched');
                return res.redirect('/')
            }else{
                console.log('Password is not matched');
                return res.redirect('/')
            }
        })
    })
});

module.exports = router;
