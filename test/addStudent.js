var Timeslot = require('../models/Timeslot');
var Course = require('../models/Course');
var Classroom = require('../models/Classroom');
var mongoose = require('mongoose');
var Department = require('../models/Department');
var Teacher = require('../models/Teacher');
var PreCourse = require('../models/PreCourse');
var Student = require('../models/Student');
var User = require('../models/User');


mongoose.connect('mongodb://localhost/test');
mongoose.Promise = global.Promise;

var stu1 = new Student({
      id:'3140104200'
    , name:'Edm'
    , ismale:true
    , credit:160

});

var stu2 = new Student({
      id:'3140104201'
    , name:'hello'
    , ismale:false
    , credit:150
});

var stu3 = new Student({
      id:'3140104203'
    , name:'word'
    , credit:170
});

var user1 = new User({
      name:'3140104200'
    , password:'123456'
});
var user2 = new User({
    name:"3140104201"
    , password:'123456'
});
var user3 = new User({
    name:'3140104203'
    , password:'123456'
});


stu1.save(function (err, res) {
    stu2.save(function (err, res) {
        stu3.save(function (err, res) {
            Course.findOne({id:'230202030'},function (err, res) {
                if (err) {console.log('Error occurs');}
                res._stulist.push(stu1._id,stu2._id,stu3._id);
                res.save(function (err, res) {
                    console.log('done!\n',res);
                });
            });
        });
    });
});

user1.save(function (err,res){
    user2.save(function(err,res){
        user3.save(function(err,res){
            console.log("All stu saved!");
        });
    });
});



