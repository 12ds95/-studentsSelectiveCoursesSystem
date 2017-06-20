/**
 * Created by iqich on 2017/5/30.
 */
var express = require('express');
var router = express.Router();
var Student = require('../models/Student')
    , User = require('../models/User')
    , assert = require('assert')
    ;

// router.use(function (req, res, next) {
//     if (!!req.session.loginUser) {
//         next();
//     } else {
//         res.redirect('/');
//     }
// });

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('changepw',{
        title : "change password"
    });
});

router.post('/pw/change', function(req, res, next) {
    // 0 表示修改密码失败， 1 表示修改成功
    console.log(req.body);
    var userID = req.session.loginUser;
    var temp;
    for(temp in req.body)break;
    temp = JSON.parse(temp);
    var oldpw = temp.oldpw;
    var newpw = temp.newpw;
    var confirmpw = temp.confirmpw;
    var data = {};
    if(newpw === confirmpw){
        User.findOne({name:userID},function(err,user){
            user.comparePassword(oldpw,function(err,isMatched){
                assert.equal(err,null);
                if (isMatched){
                    user.password = newpw;
                    // update new passwd
                    user.save(function(err,isSaved){
                        assert.equal(err,null);
                        data = {status : 1};
                        res.json(data);
                    });                    
                }else {
                    data = {status:0};
                    res.json(data);
                }
            })
        })
    }else {
        data = { status : 0};
        res.json(data);
    }
});

router.post('/personalinfo',function (req,res,next) {
    var userID = req.session.loginUser;
    Student.findOne({id:userID},function(err,student){
        res.render('personalinfo',{
            title : 'Personalinfo',
            studentID : userID,
            studentName : student.name,
            address : student.address,
            email : student.email,
            phone : student.phone
        });
    });    
});
module.exports = router;