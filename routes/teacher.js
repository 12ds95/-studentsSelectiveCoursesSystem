/**
 * Created by iqich on 2017/5/30.
 */
var express = require('express');
var router = express.Router();
var PreCourse = require('../models/PreCourse');
var Teacher = require('../models/Teacher')
    , assert = require('assert')
    , Student = require('../models/Student')
    ;
var ApplyClass = require('../models/ApplyClass')
    , Course = require('../models/Course')
    ;

// router.use(function (req, res, next) {
//     if (!!req.session.loginUser && !!req.session.userType) {
//         if (req.session.userType === "teacher") {
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
//         if (req.session.userType === "teacher") {
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
    var uname = req.session.loginUser;
    Teacher.findByUname(uname, function(teacher){
       var result = {
             name: teacher.name
           , id:teacher.id
           , ismale:teacher.ismale
           , phone_number:teacher.phone_number
           , department:teacher.department
       };
       var leftColAttr = {};
       leftColAttr['姓名'] = result['name'];
       leftColAttr['照片'] = "images/photo_teacher.png"
       leftColAttr['工号'] = result['id'];
       leftColAttr['性别'] = result['ismale'] === true ? '男': '女';
       leftColAttr['手机'] = result['phone_number'];
       leftColAttr['院系'] = result['department'];
       var rightColAttr = [{
           'imgURL':'images/teacher_openCourse.png',
           'URL':'/teacher/applyforclass',
           '名称':'申请开课'
       },{
           'imgURL':'images/teacher_table.png',
           'URL':'/teacher/curriculumn',
           '名称':'查看课表'
       }
       ];
       res.render('mainPage',{
           title: '教师主页',
           leftColAttr: leftColAttr,
           rightColAttr: rightColAttr
       });
    });
});

router.get('/applyforclass', function(req, res, next) {
    res.render('applyforclass',{
        title : '申请开课   '
    });
});

router.get('/pickStudents', function(req, res, next) {
    // 需要变成从请求中获取
    var tid = req.session.loginUser;
    var cid = req.query['course_ID'];
    Course.findOne({'_id':cid}, function(err, cou){
        ApplyClass.fetchStu(tid,cou.id,function (err, stuPending){
            Course.fetchStu('_id', tid, function (err, stuReady){
                res.render('pickStudents',{
                    course:cou.name,
                    studentsPending:stuPending,
                    studentsReady:stuReady
                });
            });
        });
    });
});

router.get('/curriculumn', function(req, res, next) {
    var tid = req.session.loginUser;
    Teacher.getSchedule(tid,function(courseList){
        res.render('curriculumnForT',{
            title: '个人课表-老师',
            semester: '春',
            courseList:courseList
        });
    })
    // res.render('curriculumnForT',{
    //     title: '个人课表-老师',
    //     semester: '春',
    //     courseList:[
    //         {
    //             _id:'00001',
    //             id: '211C0010',
    //             name: '面向对象程序设计',
    //             type: '大类中的工程技术类',
    //             credit: '2.5',
    //             time: '周二第9,10节 周二第11,12节{双周}',
    //             classroom: '紫金港东1A-303(多) 紫金港机房',
    //             semester: '夏'
    //         },
    //         {
    //             _id:'00002',
    //             id: '211G0210',
    //             name: 'C程序设计',
    //             type: '通识中的计算机类',
    //             credit: '3.0',
    //             time: '周三第7,8节 周五第1,2节',
    //             classroom: '紫金港东1A-305(多) 紫金港机房',
    //             semester: '春夏'
    //         },
    //         {
    //             _id:'00003',
    //             id: '211G0210',
    //             name: '计算机图形学',
    //             type: '通识中的计算机类',
    //             credit: '3.0',
    //             time: '周一第3,4节 周四第11,12节{双周}',
    //             classroom: '玉泉曹光彪西-304 玉泉曹光彪二期-103(多)',
    //             semester: '春夏'
    //         },
    //         {
    //             _id:'00004',
    //             id: '211G0210',
    //             name: '数字视音频处理',
    //             type: '通识中的计算机类',
    //             credit: '3.0',
    //             time: '周六第11,12节{单周} 周五第3,3节{双周}',
    //             classroom: '玉泉曹光彪西-304 玉泉曹光彪二期-103(多)',
    //             semester: '春夏'
    //         }
    //     ]
    // });
});
router.post('/teacher/pickStudents/select', function(req, res, next) {

    var selectedStu = req.body.id;
    var teacherID = req.session.loginUser;
    var courseID = req.session.courseID;

    console.log(req.body);
    // 从待定队列中删除
    ApplyClass.deleteMany({$or:selectedStu},function(err,deleted){
        //assert.equal(err,null);
        // 选课流程 - 把课程ID添加到学生的course_list中
        Course.findOne({id:courseID},function (err,curCourse) {
            Student.find({$or:selectedStu},function (err, stuList) {
                //assert.equal(err,null);
                var curIndex = 0;
                // for(curIndex = 0; curIndex < stuList.length;curIndex++){
                //     // BUG 这里可能会出现问题，比如一个同学选了两次课。。。
                //     stuList[curIndex]._course_list.push(curCourse._id);
                //     stuList[curIndex].save(); // 这里没有添加回调，可能会有问题
                //     curCourse._stulist.push(stuList[curIndex]._id);
                //     curCourse.save();
                // }
                saveNextStu(stuList,curIndex,curCourse,function () {
                    ApplyClass.fetchStu(teacherID,courseID,function (err, newPending) {
                        Course.fetchStu(courseID,teacherID,function (err, newReady) {
                            res.json({
                                status:1,
                                studentsPending:newPending,
                                studentsReady:newReady
                            });
                        });
                    });
                });
                // 返回新的数据以供渲染
            });
        });
    });
});

function saveNextStu(stuList,curIndex,curCourse,next) {
    stuList[curIndex]._course_list.push(curCourse._id);
    stuList[curIndex].save(function(err,saveRes){
        //assert.equal(null,err);
        curCourse._stulist.push(stuList[curIndex]._id);
        curCourse.save(function(err,result){
            //assert.equal(null,err);
            curIndex++;
            if (curIndex < stuList.length){
                saveNextStu(stuList,curIndex,curCourse,next);
            }else {
                next();
            }
        });
    });
}

function deleteNextStu(stuList, curIndex, curCourse, next) {
    for( var i = 0; i< stuList[curIndex]._course_list.length;i++){
        if (stuList[curIndex]._course_list[i] == curCourse._id){
            stuList[curIndex]._course_list.splice(i,1);
        }
    }
    stuList[curIndex].save(function (err, result) {
        //assert.equal(err,null);
        curIndex++;
        if (curIndex<stuList.length){
            deleteNextStu(stuList,curIndex,curCourse,next);
        }else {
            next();
        }
    });
}

router.post('/teacher/pickStudents/delete', function(req, res, next) {
    // console.log(req.body);
    var selectedStu = req.body.id;
    // 每一门课程唯一的下划线ID
    var course_id = req.body._id;
    Course.findOne({_id:course_id},function (err, course) {
        Student.find({$or:selectedStu},function (err, stuList) {
            //assert.equal(null,err);
            var curIndex = 0;
            deleteNextStu(stuList,curIndex,course,function () {
                ApplyClass.fetchStu(teacherID,courseID,function (err, newPending) {
                    Course.fetchStu(courseID,teacherID,function (err, newReady) {
                        res.json({
                            status:1,
                            studentsPending:newPending,
                            studentsReady:newReady
                        });
                    });
                });
            })
        })
    });
});

router.post('/applyforclass/upload', function(req, res, next) {
    console.log(req.body);
    whereStr = {'uname':req.session.loginUser};
    Teacher.findOne(whereStr,function(err, res2){
        var jsonstr;
        for(var a in req.body){
            jsonstr = a;
            break;
        }
        var obj = JSON.parse(jsonstr);
        var item = new PreCourse({
            name:obj.classname
            , ename:obj.Engclassname
            , department:obj.department
            , time_one_week:obj.classhours
            , credit:obj.credit
            , course_type:obj.classtype
            , prestudy:obj.preparation
            , _teacher:res2._id
            , capacity:obj.capacity
            , what_student:obj.objectstudent
            , campus:obj.campus
            , info:obj.classinfo
        });
        PreCourse.saveOneCourse(item, function (err) {
            var data={
                status: 1
            };
            res.json(data);
        })
    });
});
module.exports = router;