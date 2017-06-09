var express = require('express');
var router = express.Router();
var Student = require('../models/Student');

/* GET home page. */
router.get('/', function(req, res, next) {
    Student.getSchedule(0,function(err,courselist){
        console.log(courselist[0].toJSON());
        res.render('curriculum',{
            semester: '春',
            courseList: courselist
        });
    });
});

module.exports = router;

