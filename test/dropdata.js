// 删除数据库中的数据

var Timeslot = require('../models/Timeslot');
var Course = require('../models/Course');
var Classroom = require('../models/Classroom');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test')
mongoose.Promise = global.Promise;

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
})