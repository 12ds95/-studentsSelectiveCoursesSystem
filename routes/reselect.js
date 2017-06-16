var express = require('express');
var router = express.Router();

// router.use(function (req, res, next) {
//     if (!!req.session.loginUser && !!req.session.userType) {
//         if (req.session.userType === "student") {
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
    // 筛选器固定参数
    var filterNameData = [
        ['课程名称', 'name'],
        ['课程代码', 'id'],
        ['教师名字', 'teacher'],
        ['课程类别', 'course_type'],
        ['上课时间', 'time'],
        ['上课地点', 'classroom'],
        ['学期', 'semester']
    ];
    var filterOpData = [
        ['包含', 'include'],
        ['不包含', 'not_include'],
        ['等于', 'equal'],
        ['不等于', 'not_equal'],
        ['始于', 'beginWith'],
        ['并非起始于', 'not_beginWith'],
        ['止于', 'endWith'],
        ['并非停止于', 'not_endWith']
    ];
    res.render('reselect',{
        title: '补选页',
        filterNameData: filterNameData,
        filterOpData: filterOpData
    });
});


router.post('/courseData', function(req, res, next) {
    var pageNum = req.body['pageNum'];
    var query = req.body['query'];
    var itemPerPage = 20;
    var result = getCourseData(query, (pageNum-1)*itemPerPage+1, pageNum*itemPerPage);
    res.json(result);
});
function getCourseData(query, from, to) {     // 取[from,to]的数据
    // 以下是后端数据库的函数：根据query条件（如果query为null则无查询全部），读取20条课程信息（不到20则以实际为准），返回课程总数
    // 返回值：result包，包括TotalItem标签的全部学生总数，和Data标签的[from,to]区间的学生学号、姓名、学院信息
    // result = get20Data(...)
    result = {
        Data: [{
            'id': from,
            'name': 'Hello World',
            'web': 'http://www.baidu.com/',
            'course_type': 'CS',
            'credit': '12.0',
            'semester': '春夏秋冬',
            'english': 'English Name',
            'department': 'Course Department',
            'hour': '3.0-2.0',
            'prerequisite': '无',
            'course_info': '不存在的',
            'syllabus': '无',
            'teacher': '程序媛',
            'time': '周二',
            'campus': '紫金港',
            'classroom': '三本大学',
            'capacity': 30,
            '_id': '12345'
        }, {
            'id': from,
            'name': 'Hello World',
            'web': 'http://www.baidu.com/',
            'course_type': 'CS',
            'credit': '12.0',
            'semester': '春夏秋冬',
            'english': 'English Name',
            'department': 'Course Department',
            'hour': '3.0-2.0',
            'prerequisite': '无',
            'course_info': '不存在的',
            'syllabus': '无',
            'teacher': '程序猿',
            'time': '周一',
            'campus': '玉泉',
            'classroom': '世界一流大学',
            'capacity': 60,
            '_id': '23456'
        }],
        TotalItem: 1
    };
    // 以上为伪造数据，需替换

    var course = [];
    var courseItem = {};
    var courseDetail = [];
    var courseDetailItem = {};
    var id = '';

    for (var i=0; i<result['Data'].length; i++) {
        var c = result['Data'][i];
        courseDetailItem = {};
        if (c['id'] !== id) {
            if (i !== 0) {
                courseItem['courseDetail'] = courseDetail;
                course.push(courseItem);
                courseItem = {};
                courseDetail = [];
            }
            courseItem['courseCode'] = c['id'];
            courseItem['courseName'] = c['name'];
            courseItem['courseWeb'] = c['web'];
            courseItem['courseType'] = c['course_type'];
            courseItem['courseCredit'] = c['credit'];
            courseItem['courseSemester'] = c['semester'];
            courseItem['courseEnglish'] = c['english'];
            courseItem['courseDepartment'] = c['department'];
            courseItem['courseHour'] = c['hour'];
            courseItem['coursePrerequisite'] = c['prerequisite'];
            courseItem['courseDescription'] = c['course_info'];
            courseItem['courseSyllabus'] = c['syllabus'];
            id = c['id'];
        }
        courseDetailItem['courseId'] = c['_id'];
        courseDetailItem['courseTeacher'] = c['teacher'];
        courseDetailItem['courseTime'] = c['time'];
        courseDetailItem['coursePlace'] = c['classroom'];
        courseDetailItem['courseCapacity'] = c['capacity'];
        courseDetailItem['courseCampus'] = c['campus'];
        courseDetail.push(courseDetailItem);
    }
    courseItem['courseDetail'] = courseDetail;
    course.push(courseItem);

    var jsonn = {};
    jsonn['Content'] = course;
    jsonn['pageTotal'] = parseInt((result['TotalItem']-1) / 20 + 1);

    return jsonn;
}
{
    [
        {
            type: 'id',
            op:'gt',
            value:'314'
        },
        {
            type:'grade',
            op:'eq',

        }
    ]
}

router.post('/submit', function(req, res, next) {
    var courseName = req.body['课程名称'];
    var courseTime = req.body['上课时间'];
    var coursePlace = req.body['上课地点'];
    var phoneNum = req.body['手机号码'];
    var reselectReason = req.body['补选理由'];
    console.log(courseName, courseTime, coursePlace, phoneNum, reselectReason);
    res.json({'status':0, 'errMsg':'其实没有错'});
});

module.exports = router;
