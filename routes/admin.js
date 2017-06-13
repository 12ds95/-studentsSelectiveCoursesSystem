/**
 * Created by lenovo on 2017/5/24.
 */

var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
var PreCourse = require('../models/PreCourse');



//userlist
router.get('/userlist',function(req,res){
    User.fetch(function(err,users){
        if (err) {
            console.log(err)
        }
        res.render('userlist',{
            title: "用户列表",
            users: users
        })
    });
});
router.get('/reviewClasses',function(req,res){
    PreCourse.getAll(0, function(err, courselist){
        res.render('reviewClasses', {classList:courselist});
    })
});
router.get('/reviewApplyforclass',function(req,res){
    res.render('reviewApplyforclass',{
        classname: '当代中国经济',
        Engclassname: 'economy',
        department: '经济学院',
        classhours: '2.5',
        credit: '2.5',
        classtype: '大类课程',
        preparation: '无',
        capacity: '200',
        objectstudent: '',
        campus: '紫金港',
        classinfo: 'classinfo classinfo classinfo',
        file1: './index.js'
    })
});
router.post('/admin/reviewClasses/apply', function(req, res, next) {
    console.log(req.body);
    var data={
        status: 1
    };
    console.log(data);
    res.json(data);
});
module.exports = router;