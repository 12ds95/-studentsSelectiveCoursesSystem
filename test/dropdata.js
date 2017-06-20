// 删除数据库中的数据

var Timeslot = require('../models/Timeslot');
var Course = require('../models/Course');
var Classroom = require('../models/Classroom');
var mongoose = require('mongoose');
var Teacher = require('../models/Teacher');
var PreCourse = require('../models/PreCourse');
var Department = require('../models/Department');
var User = require('../models/User');
var Student = require('../models/Student');
mongoose.connect('mongodb://localhost/test');
mongoose.Promise = global.Promise;
Student.collection.drop(function (err, res) {
    if(err){console.log(err);}
    console.log('Drop Student success!');
});
User.collection.drop(function (err, res) {
	if(err){console.log(err);}
	console.log('Drop User success!');
});
Timeslot.collection.drop(function(err,res){
	if (err) {console.log(err);}
	console.log('Drop Timeslot success!');
});
Course.collection.drop(function(err,res){
	if (err) {console.log(err);}
	console.log('Drop Course success!');
});
Classroom.collection.drop(function(err,res){
	if (err) {console.log(err);}
	console.log('Drop Classroom success!');
});
Teacher.collection.drop(function(err, res){
	if(err){console.log(err);}
	console.log('Drop Classroom success!');
});
PreCourse.collection.drop(function(err, res){
    if(err){console.log(err);}
    console.log('Drop PreCourse success!');
});
Department.collection.drop(function(err, res){
    if(err){console.log(err);}
    console.log('Drop Department success!');
});
