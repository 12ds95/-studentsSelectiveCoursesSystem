var express = require('express');
var router = express.Router();
var Course = require('../models/Course')
    , Student = require('../models/Student')
    , Teacher = require('../models/Teacher')
    , assert = require('assert')
    ;

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
        ['等于', '$eq'],
        ['不等于', '$ne'],
        ['包含', '$regex'],
        ['大于', '$gt'],
        ['小于', '$lt']
    ];
    res.render('select',{
        title: '选课页',
        filterNameData: filterNameData,
        filterOpData: filterOpData
    });
});


router.post('/courseData', function(req, res, next) {
    var pageNum = req.body['pageNum'];
    var query = req.body['query'];
    var itemPerPage = 20;
    getCourseData(query, (pageNum-1)*itemPerPage+1, pageNum*itemPerPage, function(result){
         res.json(result);
    });

});
function getCourseData(query, from, to, cb) {     // 取[from,to]的数据
    // 以下是后端数据库的函数：根据query条件（如果query为null则无查询全部），读取20条课程信息（不到20则以实际为准），返回课程总数
    // 返回值：result包，包括TotalItem标签的全部学生总数，和Data标签的[from,to]区间的学生学号、姓名、学院信息
    // result = get20Data(...)
    // 以上为伪造数据，需替换
    Course.getAll(query,Math.ceil(from/20),function(err,courseList){
        var course = [];
        var courseItem = {};
        var courseDetail = [];
        var courseDetailItem = {};
        var id = '';
        var result = {
            Data:courseList,
            TotalItem:courseList.length
        }
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
        cb(jsonn);
    });   
}

router.post('/submit', function(req, res, next) {
    var _id = req.body['courseId'];
    var sid = req.session.loginUser;

    // 以下是后端数据库的函数：选课
    // 返回值：result包，包括是否成功status（成功：0，失败：-1）、错误原因errMsg
    // result = selectCourse(...)
    // 以上
    Student.findOne({id:sid},function(err,student){
        var errMsg,status;
        if(err) {errMsg = err;status = -1;}
        else{
            status = 0; errMsg = "选课成功";
            for(var i = 0; i < student._course_list.length;i++){
                if(_id == student._course_list[i]) {
                    status = -1;
                    errMsg = "已选该课程";
                    var jsonn = {};
                    jsonn['status'] = status;
                    jsonn['errMsg'] = errMsg;
                    res.json(jsonn);
                    break;
                }
            }
            // 可以开始选课
            if(status == 0){
                Course.findOne({_id:_id},function(err,course){
                    student._course_list.push(course._id);
                    student.credit += course.credit;
                    course._stulist.push(student._id);
                    student.save(function(err, saveRes){
                        course.save(function(err, saveResult){
                            res.json({
                                status: 0
                                , errMsg:'Success!'
                            });
                        });
                    });
                });
            }
        }
    });    
});

module.exports = router;
