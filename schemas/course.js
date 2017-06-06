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
	, _time:{type:Schema.Types.ObjectId,ref:'Timeslot'}
	// 上课地点
	, _classroom:{type:Schema.Types.ObjectId, ref:'Classroom'}
	// 学期 - 是一个学期的数组
	, _semester:{type:Schema.Types.ObjectId,ref:'Semester'}
	, capacity: Number
	, campus:{
		type:String,
		enum:['紫金港','玉泉','西溪','华家池','之江','舟山','海宁']
	}
	, exam:{type:Schema.Types.ObjectId, ref	:'exam'}
	// tid:String, // teacher's id
},{toJSON:{virtuals:true},toObject:{virtuals:true}});

CourseSchema.virtual('time').get(function(){
	return this._time.day+ this._time.time;
});


CourseSchema.virtual('classroom').get(function(){
	return this._classroom.campus + this._classroom.building + this._classroom.room_number;
});

CourseSchema.pre('find',function(next){

	next();
});

module.exports = CourseSchema;
