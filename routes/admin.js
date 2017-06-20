/**
 * Created by lenovo on 2017/5/24.
 */

var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
var nodeExcel = require('excel-export');
var PreCourse = require('../models/PreCourse');
var Student = require('../models/Student');
var reportData;

// router.use(function (req, res, next) {
//     if (!!req.session.loginUser && !!req.session.userType) {
//         if (req.session.userType === "admin") {
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
    var userID = req.session.loginUser;
    var userType = req.session.userType;
    if(userType != "admin"){
        // 不知道如何处理
        res.redirect("/");
    }
    var result = {
        name: 'Edm',
        id: 'na1121na',
        ismale: true,
        phone_number: '88123123',
        department: '计算机学院'
    };
    // 以上为伪造数据，需要替换掉
    var leftColAttr = {};
    leftColAttr['姓名'] = result['name'];
    leftColAttr['照片'] = "images/photo_admin.png"
    leftColAttr['工号'] = result['id'];
    leftColAttr['性别'] = result['ismale'] === true ? '男': '女';
    leftColAttr['手机'] = result['phone_number'];
    leftColAttr['院系'] = result['department'];
    var rightColAttr = [{
        'imgURL':'images/admin_studentManager.png',
        'URL':'/studentManager',
        '名称':'学生管理'
    },{
        'imgURL':'images/admin_teacherManager.png',
        'URL':'/teacherManager',
        '名称':'教师管理'
    },{
        'imgURL':'images/admin_noticeManager.png',
            'URL':'/noticeManager',
            '名称':'通知管理'
    },{
        'imgURL':'images/admin_reselectPermission.png',
            'URL':'/teacher/pickStudent',
            '名称':'补选审核'
    },{
        'imgURL':'images/admin_coursePermission.png',
        'URL':'/admin/reviewClasses',
        '名称':'开课审核'
    },{
        'imgURL':'images/admin_statistic.png',
        'URL':'/admin/report/inforeport',
        '名称':'报表统计'
    }
    ];
    res.render('mainPage',{
        title: '管理员主页',
        leftColAttr: leftColAttr,
        rightColAttr: rightColAttr
    });
});


//userlist
router.get('/userlist',function(req,res){
    User.fetch(function(err,users){
        if (err) {
            console.log(err)
        }
        res.render('userlist',{
            title: "用户列表",
            users: users
        });
    });
});
router.get('/report/inforeport', function(req, res, next) {
    Student.getLowCredit(function(data){
        reportData = data;
        res.render('inforeport', {'data':data});
    });
});
router.get('/reviewClasses',function(req,res){
    //re?time=""
    PreCourse.getAll(0, function(err, courselist){
        res.render('reviewClasses', {classList:courselist});
    });
});
router.get('/reviewApplyforclass',function(req,res){
    var temp = req.query['time'];
    PreCourse.findOneCourse(temp, function(list){
        var tmp = list;
        res.render('reviewApplyforclass',{
            classname: list.classname,
            Engclassname: list.Engclassname,
            department: list.department,
            classhours: list.classhours,
            credit: list.credit,
            classtype: list.classtype,
            preparation: list.preparation,
            capacity: list.capacity,
            objectstudent: list.objectstudent,
            campus: list.campus,
            classinfo: list.classinfo,
            _id: list._id
        })
    });
    /*
    res.render('reviewApplyforclass',{
        _id:'0001',
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
    */
});
router.post('/admin/reviewApplyforclass/pass', function(req, res, next) {
    console.log(req.body);
    var tmp;
    for(tmp in req.body) break;
    PreCourse.confirmOneCourse(tmp, function(res1){
        if(res1 == 0) console.log("Confirm Fail!");
        if(res1 == 1) PreCourse.deleteOneCourse(tmp, function (res2) {
            var data = {status : res2};
            console.log(data);
            res.json(data);
        });
    });
});
/*
router.post('/admin/reviewClasses/apply', function(req, res, next) {
    console.log(req.body);
    var data= PreCourse.confirmOneCourse(req.body, function());
    console.log(data);
    res.json(data);
});
*/
router.post('/admin/reviewClasses/search', function(req, res, next) {

    console.log(req.body);
    var keyword;
    for (keyword in req.body) break;
    if(typeof(keyword)== "undefined"){
        PreCourse.find({},function(err,courseList){
            res.json({
                status:1
                ,classList:courseList});
        })
    }else{
        PreCourse.find({$or:[
        {name:{$regex:keyword}}
        ,{ename:{$regex:keyword}}
        ,{department:{$regex:keyword}}
        ,{course_type:{$regex:keyword}}
        ]},function(err,courseList){
            res.json({
                status:1
                ,classList:courseList});
        });
    }
    
    // var data={
    //     status: 1
    // };
    // console.log(data);
    // res.json(data);
});

router.get('/report',function (req,res,next) {
    var result = {
        name: '张传华',
        id: '3456',
        ismale: true,
        phone_number: '88123123',
        department: '计算机学院'
    };
    // 以上为伪造数据，需要替换掉
    var leftColAttr = {};
    leftColAttr['姓名'] = result['name'];
    leftColAttr['照片'] = "images/photo_admin.png"
    leftColAttr['工号'] = result['id'];
    leftColAttr['性别'] = result['ismale'] === true ? '男': '女';
    leftColAttr['手机'] = result['phone_number'];
    leftColAttr['院系'] = result['department'];
    var rightColAttr = [{
        'imgURL':'../images/admin_studentManager.png',
        'URL':'/admin/report/inforeport',
        '名称':'学生报表'
    }];
    res.render('mainPage',{
        title: '报表统计',
        leftColAttr: leftColAttr,
        rightColAttr: rightColAttr
    });
});


router.get('/report/stureportdl', function(req, res, next) {
    var array=[];
    var myobj = eval(reportData);
    for(var i=0; i<myobj.length;i++){
        var myarray =[];
        myarray[0]=myobj[i].id;
        myarray[1]=myobj[i].name;
        if(myobj[i].ismale)
            myarray[2]='男';
        else
            myarray[2]='女';
        myarray[3]=myobj[i].credits;
        myarray[4]=myobj[i].department;
        myarray[5]=myobj[i].uname;
        array[i]=myarray;
    }
    var conf = {};
    conf.name = 'studentinfo';
    conf.cols = [{
        caption: '学号',
        type: 'string'
    },
        {
            caption: '姓名',
            type: 'string'
        },
        {
            caption: '性别',
            type: 'string'
        },
        {
            caption: '学分',
            type: 'number'
        },
        {
            caption: '学院',
            type: 'string'
        },
        {
            caption: '用户名',
            type: 'string'
        }];

    conf.rows = array;
    var result = nodeExcel.execute(conf);
    //console.log(result);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename= stureport.xlsx");
    // //res.setHeader('Content-Type', 'text/plain');
    res.end(result, 'binary');
    
});

module.exports = router;