/**
 * Created by iqich on 2017/5/30.
 */
var express = require('express');
var router = express.Router();
var Student = require('../models/Student');

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
    
});

router.post('/changeinfo', function(req, res, next) {
    console.log(req.body);
    var userID = req.session.loginUser;
    var address = req.body.address;
    var email = req.body.email;
    var phone = req.body.phone;

    Student.findOne({id:userID},function(err,student){
        student.address = address;
        student.email = email;
        student.phone = phone;
        student.save(function(err,statusCode){
            var data;
            if(err) { data = {status : -1}; }
            else { data = {status:1}; }
            res.json(data);
        });
    });
});

router.get('/changepw', function (req,res,next) {
    res.render('changepw',{
        title : "change password"
    });
});

module.exports = router;