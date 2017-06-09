var express = require('express');
var router = express.Router();
var Teacher = require('../models/Teacher');
var TeacherSchema =
/* GET home page. */
router.get('/', function(req, res, next) {
    // 左侧固定参数
    Teacher.getTeacherList(function (err, res) {
        console.log(res);
    });
    var leftTitle = '信息与动态';
    var leftImage = 'images/people_default.png';
    var leftText = {
        '工号': '2333',
        '院系': '妓院妓院妓院'
    };
    // 右侧筛选器固定参数
    var filterNameData = [
        '课程名称',
        '课程代码',
        '教师名字',
        '课程类别'
    ];
    var filterOpData = [
        '包含',
        '不包含',
        '等于',
        '不等于'
    ];
    // 渲染
    res.render('teacherManager',{
        title: '选课页',
        leftTitle: leftTitle,
        leftImage: leftImage,
        leftText: leftText,
        filterNameData: filterNameData,
        filterOpData: filterOpData
    });
});

router.post('/tableData', function(req, res, next) {
    var pageNum = req.body['pageNum'];
    var itemPerPage = 20;
    var result = getTeacherData((pageNum-1)*itemPerPage+1, pageNum*itemPerPage);
    res.json(result);
});
function getTeacherData(from, to) {     // 取[from,to]的数据
    var result;

    if (from === 1) {
        result = {
            'Title': ['工号','姓名','学院'],
            'Content': [
                ['1_1','张三','计算机科学与技术学院'],
                ['1_2','李四','信电']
            ],
            'pageTotal': 4
        }
    } else if(from === 21) {
        result = {
            'Title': ['工号','姓名','学院'],
            'Content': [
                ['2_1','张三','计算机科学与技术学院'],
                ['2_2','李四','信电']
            ],
            'pageTotal': 4
        }
    } else if(from === 41) {
        result = {
            'Title': ['工号','姓名','学院'],
            'Content': [
                ['3_1','张三','计算机科学与技术学院'],
                ['3_2','李四','信电']
            ],
            'pageTotal': 4
        }
    } else {
        result = {
            'Title': ['工号','姓名','学院'],
            'Content': [
                ['4_1','张三','计算机科学与技术学院'],
                ['4_2','李四','信电']
            ],
            'pageTotal': 4
        }
    }
    return result;
}

router.post('/addData', function(req, res, next) {
    var teacherID = req.body['教师工号'];
    var teacherName = req.body['教师姓名'];
    var teacherDepartment = req.body['学院'];
    console.log(teacherID, teacherName, teacherDepartment);
    res.json({'status':-1, 'errMsg':'其实没有错'});
});

module.exports = router;
