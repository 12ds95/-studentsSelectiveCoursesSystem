var Timeslot = require('../models/Timeslot');
var Course = require('../models/Course');
var Classroom = require('../models/Classroom');
var mongoose = require('mongoose');
var Department = require('../models/Department');
var Teacher = require('../models/Teacher');
var PreCourse = require('../models/PreCourse');
mongoose.connect('mongodb://localhost/test')
mongoose.Promise = global.Promise;


console.log("save teacher begin");

var teacher1 = new Teacher({
        name:"老师1"
    , ismale:true
    , uname:'teacher1'
    , id:'12224521'
    , department:"计算机学院"
    , phone_number:"123456"
    , info:"no"
});
teacher1.save(function (err, res) {
    if(err) {console.log('Error in teacher1.save()\n',err);}
    var precoures1 = new PreCourse({
            name:"测试"
        , ename:"test"
        , department:"testd"
        , time_one_week:"test"
        , credit:2.0
        , course_type:"test"
        , prestudy:""
        , _teacher:teacher1._id
        , capacity:100
        , what_student:"test"
        , campus:"玉泉"
        , info:"test"
    });
    precoures1.save(function (err, res) {
        if(err){console.log('Error in pre.save()\n', err);}
    });
});
var teacher2 = new Teacher({
        name:"老师2"
    , ismale:true
    , uname:'teacher2'
    , id:"teacher2"
    , department:"新店学院"
    , phone_number:"123456789"
    , info:"yes"
});
teacher2.save(function (err, res) {
    if(err) {console.log('Error in teacher2.save()\n',err);}
});
