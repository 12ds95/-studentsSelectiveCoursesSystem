var express = require('express');
var router = express.Router();
var Course = require('../models/Course')
/* GET home page. */
router.get('/', function(req, res, next) {
    Course.getAll(0, function(err, courselist){
        res.render('select', courselist)
    });
    // 筛选器固定参数
    var filterNameData = [
        '课程名称',
        '课程代码',
        '教师名字',
        '课程类别',
        '上课时间',
        '上课地点',
        '学期'
    ];
    var filterOpData = [
        '包含',
        '不包含',
        '等于',
        '不等于',
        '始于',
        '并非起始于',
        '止于',
        '并非停止于'
    ];
    var courseItemList = [{
        'courseCode': '0xcccc',
        'courseName': 'Hello World',
        'courseWeb': 'http://www.baidu.com/',
        'courseType': 'CS',
        'courseCredit': '12.0',
        'courseSemester': '春夏秋冬',
        'courseEnglish': 'English Name',
        'courseDepartment': 'Course Department',
        'courseHour': '3.0-2.0',
        'courseWeight': '1.0',
        'courseBelong': '布吉岛',
        'coursePrerequisite': '无',
        'courseDescription': '不存在的',
        'courseSyllabus': '无',
        'courseDetail': [{
            'courseTeacher': '程序猿',
            'courseTime': '周一',
            'coursePlace': '世界一流大学'
        },{
            'courseTeacher': '程序媛',
            'courseTime': '周二',
            'coursePlace': '三本大学'
        }]
    },{
        'courseCode': '烫烫烫烫',
        'courseName': '錕斤洘哴',
        'courseWeb': 'http://www.cc98.org/',
        'courseType': 'bug',
        'courseCredit': '0.0',
        'courseSemester': '夏冬春秋',
        'courseEnglish': 'English Name',
        'courseDepartment': 'Course Department',
        'courseHour': '3.0-2.0',
        'courseWeight': '1.0',
        'courseBelong': '布吉岛',
        'coursePrerequisite': '无',
        'courseDescription': '不存在的',
        'courseSyllabus': '无',
        'courseDetail': [{
            'courseTeacher': '虫子',
            'courseTime': '周三',
            'coursePlace': '虫洞'
        },{
            'courseTeacher': '蛤蛤',
            'courseTime': '周四',
            'coursePlace': '上海交通大学'
        }]
    }
    ];
    res.render('select',{
        title: '选课页',
        filterNameData: filterNameData,
        filterOpData: filterOpData,
        courseItemList: courseItemList
    });
});


router.post('/courseData', function(req, res, next) {
    var pageNum = req.body['pageNum'];
    var itemPerPage = 20;
    var result = getTeacherData((pageNum-1)*itemPerPage+1, pageNum*itemPerPage);
    res.json(result);
});
function getTeacherData(from, to) {     // 取[from,to]的数据
    return {
        Content: [{
            'courseCode': from,
            'courseName': 'Hello World',
            'courseWeb': 'http://www.baidu.com/',
            'courseType': 'CS',
            'courseCredit': '12.0',
            'courseSemester': '春夏秋冬',
            'courseEnglish': 'English Name',
            'courseDepartment': 'Course Department',
            'courseHour': '3.0-2.0',
            'courseWeight': '1.0',
            'courseBelong': '布吉岛',
            'coursePrerequisite': '无',
            'courseDescription': '不存在的',
            'courseSyllabus': '无',
            'courseDetail': [{
                'courseTeacher': '程序猿',
                'courseTime': '周一',
                'coursePlace': '世界一流大学'
            }, {
                'courseTeacher': '程序媛',
                'courseTime': '周二',
                'coursePlace': '三本大学'
            }]
        },{
            'courseCode': '烫烫烫烫',
            'courseName': '錕斤洘哴',
            'courseWeb': 'http://www.cc98.org/',
            'courseType': 'bug',
            'courseCredit': '0.0',
            'courseSemester': '夏冬春秋',
            'courseEnglish': 'English Name',
            'courseDepartment': 'Course Department',
            'courseHour': '3.0-2.0',
            'courseWeight': '1.0',
            'courseBelong': '布吉岛',
            'coursePrerequisite': '无',
            'courseDescription': '不存在的',
            'courseSyllabus': '无',
            'courseDetail': [{
                'courseTeacher': '虫子',
                'courseTime': '周三',
                'coursePlace': '虫洞'
            },{
                'courseTeacher': '蛤蛤',
                'courseTime': '周四',
                'coursePlace': '上海交通大学'
            }]
        }],
        pageTotal: 4
    }
}


module.exports = router;
