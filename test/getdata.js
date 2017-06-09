var Timeslot = require('../models/Timeslot');
var Course = require('../models/Course');
var Classroom = require('../models/Classroom');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test')
mongoose.Promise = global.Promise;

Course.find({},function(err,res){
	if (err) {console.log("Error\n",err);}
	
}).populate('classroom').populate('time').exec(function(err,res){
	console.log(res);
})