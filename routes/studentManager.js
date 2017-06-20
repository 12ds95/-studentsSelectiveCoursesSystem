var express = require('express');
var router = express.Router();
var Student = require('../models/Student')
    , assert = require('assert')
    ;
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
    // 左侧固定参数
    var leftTitle = '信息与动态';
    var leftImage = 'images/photo_student.png';
    var leftText = {
        '工号': 'na1121na',
        '院系': '计算机学院'
    };
    // 右侧筛选器固定参数
    var filterNameData = [
        ['学号', 'id'],
        ['姓名', 'name'],
        ['学院', 'department']
    ];
    var filterOpData = [
        ['等于', 'equal'],
        ['不等于', 'not_equal'],
        ['包含', 'include'],
        ['不包含', 'not_include'],
        ['大于', 'greater_than'],
        ['小于', 'less_than']
    ];
    // 渲染
    res.render('studentManager',{
        title: '学生信息管理页',
        leftTitle: leftTitle,
        leftImage: leftImage,
        leftText: leftText,
        filterNameData: filterNameData,
        filterOpData: filterOpData
    });
});

router.post('/tableData', function(req, res, next) {
    var pageNum = req.body['pageNum'];
    var query = req.body['query'];
    var itemPerPage = 20;
    Student.getAPage(pageNum,itemPerPage,function(pageResult){
        var result = {
            'Data': pageResult
            , 'TotalItem':pageResult.length
        }
        var jsonn = {};
        jsonn['PageTotal'] = parseInt((result['TotalItem']-1) / 20 + 1);
        jsonn['Title'] = ['学号','姓名','学院'];
        jsonn['IsShow'] = [true, true, true];
        jsonn['Content'] = [];
        for (var i=0; i<result['Data'].length; i++) {
            jsonn['Content'].push({
                '学号': result['Data'][i]['id'],
                '姓名': result['Data'][i]['name'],
                '学院': result['Data'][i]['department']
            });
        }
        res.json(jsonn);
    });
});

router.post('/getData', function (req, res, next) {
    var ID = req.body['学号'];
    // 以下是后端数据库的函数：查找学生
    // 返回值：result包，包括该学生的所有信息
    // result = addData(...)
    // 以上
    console.log('In getData');
    Student.findOne({id:ID},function(err,student){
        var jsonn = {};
        jsonn['学号'] = student.id;
        jsonn['性别'] = student.ismale === true ? '男': '女';
        jsonn['姓名'] = student.name;
        jsonn['学院'] = student.department;
        jsonn['学分'] = student.credit;
        res.json(jsonn);
    })
    
});

router.post('/addData', function(req, res, next) {
    var ID = req.body['学号'];
    var name = req.body['姓名'];
    var gender = req.body['性别'];
    var department = req.body['学院'];
    var credit = req.body['学分'];
    // 以下是后端数据库的函数：添加学生
    // 返回值：result包，包括是否成功status（成功：0，失败：-1）、错误原因errMsg
    // result = addData(...)
    // 以上
    var student = new Student({
        id:ID
        , name:name
        , ismale:gender === '男' ? 1:0 
        , credit:credit
        , department: department
    });

    student.save(function(err,save_res){
        if (err) {
            res.json({
                status: -1
                , errMsg : "Can't save student"
            });
        }
        else {
            res.json({
                status : 0
                , errMsg : "Save successfully"
            });
        }
    });
});

router.post('/modifyData', function(req, res, next) {
    var ID = req.body['学号'];
    var name = req.body['姓名'];
    var gender = req.body['性别'];
    var department = req.body['学院'];
    var credit = req.body['学分'];
    // 以下是后端数据库的函数：修改学生信息
    // 返回值：result包，包括是否成功status（成功：0，失败：-1）、错误原因errMsg
    // result = modifyData(...)
    // 以上
    Student.findOne({id:ID},function(err,student){
        student.name = name;
        student.gender = gender;
        student.department = department;
        student.credit = credit;
        student.save(function(err,save_res){
            if (err) {
                res.json({
                    status: -1
                    , errMsg : "Can't modify student"
                });
            }
            else {
                res.json({
                    status : 0
                    , errMsg : "Modify successfully"
                });
            }
        })
    })
});

router.post('/deleteData', function(req, res, next) {
    var ID = req.body['学号'];
    // 以下是后端数据库的函数：修改学生信息
    // 返回值：result包，包括是否成功status（成功：0，失败：-1）、错误原因errMsg
    // result = modifyData(...)
    // 以上

    Student.findOne({id:ID},function(err,user){
	    user.remove(function(err,remove_res){
            if (err) {
                res.json({
                    status: -1
                    , errMsg : "Can't delete student"
                });
            }
            else {
                res.json({
                    status : 0
                    , errMsg : "Delete successfully"
                });
            }
        })
    })
});

module.exports = router;
