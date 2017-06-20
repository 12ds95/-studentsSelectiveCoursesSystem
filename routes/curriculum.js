var express = require('express');
var router = express.Router();
var Student = require('../models/Student');

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
    Student.getSchedule(0,function(err,courselist){
        console.log(courselist[0].toJSON());
        res.render('curriculum',{
            semester: '春',
            courseList: courselist
            // courseList:[
            //     {
            //         id: '211C0010',
            //         name: '面向对象程序设计',
            //         type: '大类中的工程技术类',
            //         credit: '2.5',
            //         time: '周二第9,10节 周二第11,12节{双周}',
            //         classroom: '紫金港东1A-303(多) 紫金港机房',
            //         semester: '夏'
            //     },
            //     {
            //         id: '211G0210',
            //         name: 'C程序设计',
            //         type: '通识中的计算机类',
            //         credit: '3.0',
            //         time: '周三第7,8节 周五第1,2节',
            //         classroom: '紫金港东1A-305(多) 紫金港机房',
            //         semester: '春夏'
            //     },
            //     {
            //         id: '211G0210',
            //         name: '计算机图形学',
            //         type: '通识中的计算机类',
            //         credit: '3.0',
            //         time: '周一第3,4节 周四第11,12节{双周}',
            //         classroom: '玉泉曹光彪西-304 玉泉曹光彪二期-103(多)',
            //         semester: '春夏'
            //     },
            //     {
            //         id: '211G0210',
            //         name: '数字视音频处理',
            //         type: '通识中的计算机类',
            //         credit: '3.0',
            //         time: '周六第11,12节{单周} 周五第3,3节{双周}',
            //         classroom: '玉泉曹光彪西-304 玉泉曹光彪二期-103(多)',
            //         semester: '春夏'
            //     }
            // ]
        });
    });
});


module.exports = router;

