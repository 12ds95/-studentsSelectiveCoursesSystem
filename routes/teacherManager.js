var express = require('express');
var router = express.Router();
var Teacher = require('../models/Teacher');
var Department = require('../models/Department');
var assert = require('assert');

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

router.post('/getData', function (req, res, next) {
    var ID = req.body['工号'];
    // var name = req.body['姓名'];
    // var department = req.body['学院'];
    // 以下是后端数据库的函数：查找教师
    // 返回值：result包，包括该教师的所有信息
    // result = addData(...)
    Teacher.findById(ID,function (err, result) {
        var jsonn = {};
        jsonn['工号'] = result['id'];
        jsonn['性别'] = result['ismale'] === true ? '男': '女';
        jsonn['姓名'] = result['name'];
        jsonn['学院'] = result['department'];
        jsonn['手机号码'] = result['phone_number'];
        jsonn['个人简介'] = result['info'];
        res.json(jsonn);
    });

});

router.post('/addData', function(req, res, next) {
    var ID = req.body['工号'];
    var name = req.body['姓名'];
    var render = req.body['性别'];
    var department = req.body['学院'];
    var phone = req.body['手机号码'];
    var info = req.body['个人简介'];

    var teacher = new Teacher({
          name:req.body['姓名']
        , ismale:req.body['性别']
        , id:req.body['工号']
        , phone_number:req.body['手机号码']
        , info : req.body['个人简介']
    });
    teacher.save(function (err, res) {
        var status;
        var msg;
        if (err){ status = -1; msg = err;}
        else { status = 0; msg = "Add success!"}
        var jsonn = {};
        jsonn['status'] = status;
        jsonn['errMsg'] = msg;
        res.json(jsonn);
    });
    
});

router.post('/modifyData', function(req, res, next) {
    var ID = req.body['工号'];
    var name = req.body['姓名'];
    var gender = req.body['性别'];
    var department = req.body['学院'];
    var phone = req.body['手机号码'];
    var info = req.body['个人简介'];
    // 以下是后端数据库的函数：修改教师信息
    // 返回值：result包，包括是否成功status（成功：0，失败：-1）、错误原因errMsg
    // result = modifyData(...)
    // 以上
    Teacher.findOne({id:ID},function(err,teacher){
        teacher.name = name;
        teacher.ismale = (gender == '男');
        teacher.phone_number = phone;
        teacher.info = info;
        Department.find({dept_name:department},function(err,new_dept){
            // update the teacher's department
            teacher._department = new_dept._id;
            teacher.save(function(err,save_res){
                assert.equal(err,null);
                console.log('Teacher info update success!');
                var status,errmsg;
                if(err) { status = 1; errmsg = err;}
                else { status = 0; errmsg = null;}
                    var jsonn = {};
                    jsonn['status'] = status;
                    jsonn['errMsg'] = errmsg;
                    // return until update finish
                    res.json(jsonn);
            });
        });
    });
});

router.post('/deleteData', function(req, res, next) {
    var ID = req.body['工号'];
    // 以下是后端数据库的函数：修改教师信息
    // 返回值：result包，包括是否成功status（成功：0，失败：-1）、错误原因errMsg
    // result = modifyData(...)
    // 以上
    Teacher.deleteOne({id:ID},function(err){
        assert.equal(err,null);
        var jsonn;
        if (err){jsonn['status'] = 1; jsonn['errMsg'] = err ;}
        else { jsonn['status'] = 0;jsonn['errMsg'] = null;}
        res.json(jsonn);
    });
});

module.exports = router;
