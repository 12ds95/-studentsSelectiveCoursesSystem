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
    var stuID = req.session.loginUser;

    Student.getSchedule(stuID,function(err,courselist){
        console.log(courselist.toJSON());
        res.render('curriculum',{
            semester: '春',
            courseList: courselist
        });
    });
});

module.exports = router;

