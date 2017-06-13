var mongoose = require('mongoose');
var Teacher = require('../models/Teacher');
var Semester = require('../models/Semester');
var Timeslot = require('../models/Timeslot');
var Classroom = require('../models/Classroom');
var Student = require('../models/Student');

var Schema = mongoose.Schema;
var CourseSchema = new mongoose.Schema({
	  id:{type:String}
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
	, _stulist:[{type:Schema.Types.ObjectId,ref:'Student'}]
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

CourseSchema.statics = {
	fetchStu:function (cid,tid,cb) {
		return this.find({cid:cid})
			.populate('_teacher')
			.find({_teacher:tid})
			// .populate('_stulist')
			.exec(function(err,res){
				if (res != null){
					res.populate('_stulist');
                    cb(err,res);
				}else {
					cb("Can't find such list",null);
				}
			});
    }
};


CourseSchema.pre('find',function(next){
	next();
});
CourseSchema.statics = {
	getAll: function(page, cb){
		this.find({})
			.populate({path:'_teacher'})
			.populate({path:'_time'})
			.populate({path:'_classroom'})
			.populate({path:'_semester'})
			.sort('id')
			.exec(function(err, res){
				if(res.length == 0 || res.length<(page-1)*20)
					cb(err, res);
				var begin = 0;
				var count = 0, i;
				var last = "";
				for(i = 0; i < res.length; i++){
                    if(count == 20*(page-1))begin = i;
                    else if(count == 20 * page)break;
					if(res[i].id != last.id){
						count++;
						last = res[i];
					}

				}
				var result = new Array();
				for(var count = begin; count < i; count++)
					result[count-begin] = res[count];
				cb(err,result);
			})
	}
}

module.exports = CourseSchema;
