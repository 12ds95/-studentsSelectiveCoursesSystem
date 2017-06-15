/**
 * Created by iqich on 2017/5/30.
 */
var express = require('express');
var router = express.Router();

// router.use(function (req, res, next) {
//     if (!!req.session.loginUser && !!req.session.userType) {
//         if (req.session.userType === "teacher") {
//             next();
//         } else {
//             res.redirect('/');
//         }
//     } else {
//         res.redirect('/');
//     }
// });

/* GET home page. */
router.get('/', function(req, res, next) {
    // 以下是后端数据库的函数：查找教师
    // 返回值：result包，包括该教师的所有信息
    // result = getData(...)
    var result = {
        name: '邓水光',
        id: '1234',
        ismale: true,
        phone_number: '88110110',
        department: '计算机学院'
    };
    // 以上为伪造数据，需要替换掉
    var leftColAttr = {};
    leftColAttr['姓名'] = result['name'];
    leftColAttr['照片'] = "images/photo_teacher.png"
    leftColAttr['工号'] = result['id'];
    leftColAttr['性别'] = result['ismale'] === true ? '男': '女';
    leftColAttr['手机'] = result['phone_number'];
    leftColAttr['院系'] = result['department'];
    var rightColAttr = [{
        'imgURL':'images/teacher_openCourse.png',
        'URL':'http://www.baidu.com',
        '名称':'申请开课'
    },{
        'imgURL':'images/teacher_reselectPermission.png',
        'URL':'http://www.baidu.com',
        '名称':'补选审核'
    },{
        'imgURL':'images/teacher_table.png',
        'URL':'http://www.baidu.com',
        '名称':'查看课表'
    }
    ];
    res.render('mainPage',{
        title: '教师主页',
        leftColAttr: leftColAttr,
        rightColAttr: rightColAttr
    });
});



router.get('/applyforclass', function(req, res, next) {
    res.render('applyforclass',{
        title : '申请开课   '
    });
});


router.get('/pickStudents', function(req, res, next) {
    res.render('pickStudents',{
        course:'面向对象程序设计',
        courseID:'0002',
        studentsPending:[
        {
            id:'3140104444',
            // credits:'56'
        },{
            id:'3140105555',
            // credits:'52'
        },{
            id:'3140105555',
            // credits:'53'
        },{
            id:'3140105555',
            // credits:'54'
        },{
            id:'3140105555',
            // credits:'55'
        },{
            id:'3140105555',
            // credits:'56'
        },{
            id:'3140105555',
            // credits:'56'
        },{
            id:'3140105555',
            // credits:'56'
        },{
            id:'3140105555',
            // credits:'56'
        },{
            id:'3140105555',
            // credits:'56'
        },{
            id:'3140105555',
            // credits:'56'
        },{
            id:'3140105555',
            // credits:'56'
        },{
            id:'3140105555',
            // credits:'56'
        },{
            id:'3140105555',
            // credits:'56'
        },{
            id:'3140105555',
            // credits:'56'
        },{
            id:'3140105553',
            // credits:'56'
        }],
        studentsReady:[
        {
            id:'3140100000',
            // credits:'12'
        },{
            id:'3140105555',
            // credits:'23'
        },{
            id:'3140105555',
            // credits:'24'
        },{
            id:'3140105555',
            // credits:'103'
        },{
            id:'3140105555',
            // credits:'56'
        },{
            id:'3140105555',
            // credits:'56'
        },{
            id:'3140105555',
            // credits:'56'
        },{
            id:'3140105555',
            // credits:'56'
        },{
            id:'3140105555',
            // credits:'56'
        },{
            id:'3140105555',
            // credits:'56'
        },{
            id:'3140105555',
            // credits:'56'
        },{
            id:'3140105555',
            // credits:'56'
        },{
            id:'3232222222',
            // credits:'56'
        }]
    });
});

router.post('/teacher/pickStudents/select', function(req, res, next) {
    console.log(req.body);
    var data={
        status: 1,
        studentsPending:[
        {
            id:'222222222',
            // credits:'5'
        },{
            id:'3140102223',
            // credits:'52'
        },{
            id:'3140102224',
            // credits:'53'
        },{
            id:'3140102225',
            // credits:'56'
        },{
            id:'3140102226',
            // credits:'56'
        }],
        studentsReady:[
        {
            id:'3140100000',
            // credits:'12'
        },{
            id:'3140100005',
            // credits:'53'
        },{
            id:'3140100001',
            // credits:'52'
        },{
            id:'3232220002',
            // credits:'51'
        }]};
    console.log(data);
    res.json(data);
});

router.post('/teacher/pickStudents/delete', function(req, res, next) {
    console.log(req.body);
    var data={
        status: 1,
        studentsReady:[
        {
            id:'222222222',
            // credits:'5'
        },{
            id:'3140102223',
            // credits:'52'
        },{
            id:'3140102224',
            // credits:'53'
        },{
            id:'3140102225',
            // credits:'56'
        },{
            id:'3140102226',
            // credits:'56'
        }],
        studentsPending:[
        {
            id:'3140100000',
            // credits:'12'
        },{
            id:'3140100005',
            // credits:'53'
        },{
            id:'3140100001',
            // credits:'52'
        },{
            id:'3232220002',
            // credits:'51'
        }]};
    console.log(data);
    res.json(data);
});

router.post('/applyforclass/upload', function(req, res, next) {
    console.log(req.body);
    var data={
        status: 1
    };
    console.log(data);
    res.json(data);
});
module.exports = router;