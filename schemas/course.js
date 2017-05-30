var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CourseSchema = new mongoose.Schema({
	  id:{type:String,unique:true}
	, name:{
		type: String
	}
	, credit: Double
	, course_info: String // 课程简介
	, course_type: String
	, teacher:{type:Schema.Types.ObjectId, ref:'Teacher'}
	// 上课时间
	, time:{[type:Schema.Types.ObjectId,ref:'Timeslot']}
	// 上课地点
	, classroom:{[type:Schema.Types.ObjectId, ref:'Classroom']}
	// 学期 - 是一个学期的数组
	, semester:{[type:Schema.Types.ObjectId,ref:'Semester']}
	, capacity: Number
	, campus:{
		type:String,
		enum:['紫金港','玉泉','西溪','华家池','之江','舟山','海宁']
	}
	, exam:{type:Schema.Types.ObjectId, ref	:'exam'}
	// tid:String, // teacher's id
});

CourseSchema.pre('save',function(next){
	next();
});

module.exports = CourseSchema;
