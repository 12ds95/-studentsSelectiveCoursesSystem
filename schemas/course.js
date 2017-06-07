var mongoose = require('mongoose');
var Timeslot = require('../models/Timeslot');
var Classroom = require('../models/Classroom');
var Schema = mongoose.Schema;
var CourseSchema = new mongoose.Schema({
	  id:{type:String,unique:true}
	, name:{
		type: String
	}
	, credit: Number
	, course_info: String // 课程简介
	, course_type: {type:String,alias:'type'}
	, _teacher:{type:Schema.Types.ObjectId, ref:'Teacher'}
	// 上课时间
	, _time:[{type:Schema.Types.ObjectId,ref:'Timeslot'}]
	// 上课地点
	, _classroom:[{type:Schema.Types.ObjectId, ref:'Classroom'}]
	// 学期 - 是一个学期的数组：
	, _semester:{type:Schema.Types.ObjectId,ref:'Semester'}
	// 也许直接表示会简单一些
	, semester:{type: String }
	, capacity: Number
	, campus:{
		type:String,
		enum:['紫金港','玉泉','西溪','华家池','之江','舟山','海宁']
	}
	, exam:{type:Schema.Types.ObjectId, ref	:'exam'}
	// tid:String, // teacher's id
},{toJSON:{virtuals:true},toObject:{virtuals:true}});

CourseSchema.virtual('time').get(function(){
	var resstring = "";
	// for (var x in this._time){
	// 	resstring = resstring + x.day+x.time + " ";
	// }
	this._time.forEach(function(x,i,a){
		if (i != 0) resstring = resstring+ " ";
        resstring = resstring + x.day+x.time ;
	});
	return resstring;
});


CourseSchema.virtual('classroom').get(function(){
	var resString="";
	this._classroom.forEach(function (x, i, a) {
        if (i != 0) resString = resString+ " ";
		resString = resString +x.campus + x.building +x.room_number;
    });
	return resString;
});

CourseSchema.pre('find',function(next){

	next();
});

module.exports = CourseSchema;
