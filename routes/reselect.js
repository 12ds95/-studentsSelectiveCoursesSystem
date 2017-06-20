var express = require('express');
var router = express.Router()
    , Teacher = require('../models/Teacher')
    , Course = require('../models/Course')
    , Student = require('../models/Student')
    , assert = require('assert')
    , ApplyClass = require('../models/ApplyClass')
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
    getCourseData(query, (pageNum-1)*itemPerPage+1, pageNum*itemPerPage, function(result){
        res.json(result);
    });
});
function getCourseData(query, from, to, cb) {     // 取[from,to]的数据
    // 以下是后端数据库的函数：根据query条件（如果query为null则无查询全部），读取20条课程信息（不到20则以实际为准），返回课程总数
    // 返回值：result包，包括TotalItem标签的全部学生总数，和Data标签的[from,to]区间的学生学号、姓名、学院信息
    // result = get20Data(...)

    // 以上为伪造数据，需替换
    Course.getAll(Math.ceil(from/20),function(err,courseList){
        result = {
            Data: courseList
            , TotalItem: courseList.length
        }
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
            courseDetailItem['courseTeacher'] = c['_teacher'].name;
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
    })
    
}

router.post('/submit', function(req, res, next) {
    var stuID = req.session.loginUser;
    var courseId = req.body['课程编号'];
    var courseName = req.body['课程名称'];
    var courseTime = req.body['上课时间'];
    var coursePlace = req.body['上课地点'];
    var phoneNum = req.body['手机号码'];
    var reselectReason = req.body['补选理由'];
    // 可以给我一个课程id吗
    var status = 0;
    Student.findOne({id:stuID},function(err,curStu){
        for(var i = 0;i<curStu._course_list.length;i++){
            if(curStu._course_list[i] == courseId){
                status = -1;
                res.json({'status':-1,'errMsg':'您已经选过该门课了'});
                break;
            }
        }
        if(status == 0){
            Course.findOne({_id:courseId})
                .populate('_teacher')
                .exec(function(err,course){
                    var applyclass = new ApplyClass({
                        sid:stuID
                        , tid:course._teacher.id
                        , cid:course.id
                        , reason: reselectReason
                    });
                    applyclass.save(function(err){
                        if (err) { res.json({'status':-1,'errMsg':err}); }
                        else {
                            res.json({'status':0,'errMsg':'成功'});
                        }
                    })
                });
        }
    })
    
    
});

module.exports = router;
