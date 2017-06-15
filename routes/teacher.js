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
router.get('/applyforclass', function(req, res, next) {
    res.render('applyforclass',{
        title : '申请开课'
    });
});


router.get('/pickStudents', function(req, res, next) {
    // 需要变成从请求中获取
    var tid = 'teacher1';
    var cid = '230202030';

    ApplyClass.fetchStu(tid,cid,function (err, stuPending) {
        Course.fetchStu(cid,tid,function (err, stuReady) {
            res.render('pickStudents',{
                course:'面向对象程序设计',
                studentsPending:stuPending,
                studentsReady:stuReady
            });
        })
    })
});

router.post('/teacher/pickStudents/select', function(req, res, next) {

    var selectedStu = req.body.studentsPending;
    var teacherID = req.session.loginUser;
    var courseID = req.body.courseID;

    console.log(req.body);
    // 从待定队列中删除
    ApplyClass.deleteMany({$or:selectedStu},function(err,deleted){
        assert.equal(err,null);
        // 选课流程 - 把课程ID添加到学生的course_list中
        Course.findOne({id:courseID},function (err,curCourse) {
            Student.find({$or:selectedStu},function (err, stuList) {
                assert.equal(err,null);
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
    // var data={
    //     status: 1,
    //     studentsPending:[
    //     {
    //         id:'222222222',
    //         // credits:'5'
    //     },{
    //         id:'3140102223',
    //         // credits:'52'
    //     },{
    //         id:'3140102224',
    //         // credits:'53'
    //     },{
    //         id:'3140102225',
    //         // credits:'56'
    //     },{
    //         id:'3140102226',
    //         // credits:'56'
    //     }],
    //     studentsReady:[
    //     {
    //         id:'3140100000',
    //         // credits:'12'
    //     },{
    //         id:'3140100005',
    //         // credits:'53'
    //     },{
    //         id:'3140100001',
    //         // credits:'52'
    //     },{
    //         id:'3232220002',
    //         // credits:'51'
    //     }]};
    // console.log(data);
    // res.json(data);
});

function saveNextStu(stuList,curIndex,curCourse,next) {
    stuList[curIndex]._course_list.push(curCourse._id);
    stuList[curIndex].save(function(err,saveRes){
        assert.equal(null,err);
        curCourse._stulist.push(stuList[curIndex]._id);
        curCourse.save(function(err,result){
            assert.equal(null,err);
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
        assert.equal(err,null);
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
            assert.equal(null,err);
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
    Teacher.findOne(null,function(err, res2){
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