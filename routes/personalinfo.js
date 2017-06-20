/**
 * Created by iqich on 2017/5/30.
 */
var express = require('express');
var router = express.Router();
var Student = require('../models/Student');
var Teacher = require('../models/Teacher');
// router.use(function (req, res, next) {
//     if (!!req.session.loginUser) {
//         next();
//     } else {
//         res.redirect('/');
//     }
// });

/* GET home page. */
router.get('/', function(req, res, next) {
    var userID = req.session.loginUser;
    if(req.session.userType === 'student'){
        Student.findOne({id:userID},function(err,student){
            res.render('personalinfo',{
                title : 'Personalinfo',
                studentID : userID,
                studentName : student.name,
                address : student.address,
                email : student.email,
                phone : student.phone
            });
        })
    }
    else {
        Teacher.findByUname(userID, function(teacher){
            res.render('personalinfo',{
                title : 'Personalinfo',
                studentID : userID,
                studentName : teacher.name,
                address : teacher.address,
                email : teacher.email,
                phone : teacher.phone_number
            });
        })
    }

    
});

router.post('/changeinfo', function(req, res, next) {
    console.log(req.body);
    var temp;
    for(temp in req.body)break;
    temp = JSON.parse(temp);
    var userID = req.session.loginUser;
    var address = temp.address;
    var email = temp.email;
    var phone = temp.phone;
    if(req.session.userType === 'student') {
        Student.findOne({id: userID}, function (err, student) {
            student.address = address;
            student.email = email;
            student.phone = phone;
            student.save(function (err, statusCode) {
                var data;
                if (err) {
                    data = {status: -1};
                }
                else {
                    data = {status: 1};
                }
                res.json(data);
            });
        });
    }
    else {
        Teacher.findByUname(userID, function(teacher){
            teacher.address = address;
            teacher.email = email;
            teacher.phone_number = phone_number;
            teacher.save(function (err, statusCode) {
                var data;
                if (err) {
                    data = {status: -1};
                }
                else {
                    data = {status: 1};
                }
                res.json(data);
            });
        })
    }
});

router.get('/changepw', function (req,res,next) {
    res.render('changepw',{
        title : "change password"
    });
});

module.exports = router;