/**
 * Created by lenovo on 2017/5/24.
 */

var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
var nodeExcel = require('excel-export');


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
            'URL':'http://www.baidu.com',
            '名称':'补选审核'
    },{
        'imgURL':'images/admin_coursePermission.png',
        'URL':'http://www.baidu.com',
        '名称':'开课审核'
    },{
        'imgURL':'images/admin_statistic.png',
        'URL':'/admin/report',
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
        })
    });
});
router.get('/reviewClasses',function(req,res){
    res.render('reviewClasses',{
        classList:[
            {
                courseName: '当代中国经济',
                userName: '徐晓红',
                department: '经济学院',
                date: '2017/5/17'
            },
            {
                courseName: '当代中国经济2',
                userName: '徐晓红',
                department: '经济学院',
                date: '2017/5/17'
            }
        ]
    })
});
router.get('/reviewApplyforclass',function(req,res){
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
});
router.post('/admin/reviewClasses/apply', function(req, res, next) {
    console.log(req.body);
    var data={
        status: 1
    };
    console.log(data);
    res.json(data);
});
router.post('/admin/reviewClasses/search', function(req, res, next) {
    console.log(req.body);
    var data={
        status: 1
    };
    console.log(data);
    res.json(data);
});
router.post('/admin/reviewApplyforclass/pass', function(req, res, next) {
    console.log(req.body);
    var data={
        status: 1
    };
    console.log(data);
    res.json(data);
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
    },{
        'imgURL':'../images/admin_teacherManager.png',
        'URL':'/admin/report/tchreport',
        '名称':'教师报表'
    }];
    res.render('mainPage',{
        title: '报表统计',
        leftColAttr: leftColAttr,
        rightColAttr: rightColAttr
    });
});

router.get('/report/inforeport', function(req, res, next) {

    // var data = [['3140102448','zhou',false, 30,'软件','ke']];
    var data=[
        {
            id:'3140102449',
            name:'Qi',
            sex:true,
            credits:25.5,
            department:'计算机',
            userName:'iqicheng'
        },{
            id:'3140102448',
            name:'zhou',
            sex:false,
            credits:30,
            department:'软件',
            userName:'ke'
        }];
    res.render('inforeport',{data}
    )

});
router.get('/report/tchreport', function(req, res, next) {

    // var data = [['3140102448','zhou',false, 30,'软件','ke']];
    var data=[
        {
            id:'3140102656',
            name:'cai',
            ismale:true,
            phone_number:'17816899099',
            department:'计算机',
            uname:'iqicheng',
            info: 'cailaoda'
        },{
            id:'3140102448',
            name:'zhou',
            ismale:false,
            phone_number:'17837492482',
            department:'软件',
            uname:'ke',
            info: '蔡老大'
        }];
    res.render('tchreport',{data}
    )

});

router.get('/report/stureportdl', function(req, res, next) {
    var data=[
        [
            '3140102449',
            'Qi',
            true,
            25.5,
            '计算机',
            'iqicheng'
        ],[
            '3140102448',
            'zhou',
            false,
            30,
            '软件',
            'ke'
        ]];
    var conf = {};
    conf.name = 'studentinfo';
    conf.cols = [{
        caption: 'id',
        type: 'string'
    },
        {
            caption: 'name',
            type: 'string'
        },
        {
            caption: 'ismale',
            type: 'bool'
        },
        {
            caption: 'credit',
            type: 'number'
        },
        {
            caption: 'department',
            type: 'string'
        },
        {
            caption: 'uname',
            type: 'string'
        }];

    conf.rows = data;
    var result = nodeExcel.execute(conf);
    //console.log(result);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename= stureport.xlsx");
    // //res.setHeader('Content-Type', 'text/plain');
    res.end(result, 'binary');
});

router.get('/report/tchreportdl', function(req, res, next) {
    var data=[
        [
            '3140102656',
            'cai',
            true,
            '17816899099',
            '计算机',
            'iqicheng',
            'cailaoda'
        ],[
            '3140102448',
            'zhou',
            false,
            '17837492482',
            '软件',
            'ke',
            '蔡老大'
        ]];
    var conf = {};
    conf.name = 'studentinfo';
    conf.cols = [{
        caption: 'id',
        type: 'string'
    },
        {
            caption: 'name',
            type: 'string'
        },
        {
            caption: 'ismale',
            type: 'bool'
        },
        {
            caption: 'phonenumber',
            type: 'string'
        },
        {
            caption: 'department',
            type: 'string'
        },
        {
            caption: 'uname',
            type: 'string'
        },
        {
            caption: 'info',
            type: 'string'
        }];

    conf.rows = data;
    var result = nodeExcel.execute(conf);
    //console.log(result);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename= tchreport.xlsx");
    // //res.setHeader('Content-Type', 'text/plain');
    res.end(result, 'binary');
});

module.exports = router;