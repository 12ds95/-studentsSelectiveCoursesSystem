var express = require('express');
var router = express.Router();
var Student = require('../models/Student')
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
    var jsonn = {};
    jsonn['学号'] = result['id'];
    jsonn['性别'] = result['ismale'] === true ? '男': '女';
    jsonn['姓名'] = result['name'];
    jsonn['学院'] = result['department'];
    jsonn['学分'] = result['credit'];
    res.json(jsonn);
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
    var jsonn = {};
    jsonn['status'] = result['status'];
    jsonn['errMsg'] = result['errMsg'];
    res.json(jsonn);
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
    var jsonn = {};
    jsonn['status'] = result['status'];
    jsonn['errMsg'] = result['errMsg'];
    res.json(jsonn);
});

router.post('/deleteData', function(req, res, next) {
    var ID = req.body['学号'];
    // 以下是后端数据库的函数：修改学生信息
    // 返回值：result包，包括是否成功status（成功：0，失败：-1）、错误原因errMsg
    // result = modifyData(...)
    // 以上
    var jsonn = {};
    jsonn['status'] = result['status'];
    jsonn['errMsg'] = result['errMsg'];
    res.json(jsonn);
});

module.exports = router;
