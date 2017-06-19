var express = require('express');
var router = express.Router();
var Student = require('../models/Student');
/* GET home page. */
router.use(function (req, res, next) {
    if (!!req.session.loginUser && !!req.session.userType) {
        if (req.session.userType === "student") {
            next();
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

router.get('/', function(req, res, next) {
    var stuID = req.session.loginUser;
    Student.findOne({id:stuID},function(err,student){
        var leftColAttr = {};
        leftColAttr['姓名'] = student['name'];
        leftColAttr['照片'] = "images/photo_student.png";
        leftColAttr['学号'] = student['id'];
        leftColAttr['性别'] = student['ismale'] === true ? '男': '女';
        leftColAttr['手机'] = student['phone'];
        leftColAttr['院系'] = student['department'];
        leftColAttr['学分'] = student['credit'];
        var rightColAttr = [
            {
                'imgURL':'images/student_select.png',
                'URL':'/select',
                '名称':'选课'
            },{
                'imgURL':'images/student_table.png',
                'URL':'/curriculum',
                '名称':'查看课表'
            },{
                'imgURL':'images/student_reselect.png',
                'URL':'/reselect',
                '名称':'补选'
            }
        ];
        res.render('student',{
            title: '学生主页',
            leftColAttr: leftColAttr,
            rightColAttr: rightColAttr
        });
    })
});

module.exports = router;
