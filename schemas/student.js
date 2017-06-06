var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Course = require('../models/Course');
var Department = require('../models/Department');
var Timeslot = require('../models/Timeslot')
  , Classroom = require('../models/Classroom');

var StudentSchema = new mongoose.Schema({
	id : {
		type: String,
		unique: true
	},
	name:String,
	ismale:Boolean,
	credit:Number,

	_department:{type:Schema.Types.ObjectId, ref:'Department'},
	_course_list:{type:Schema.Types.ObjectId, ref:'Course'},
	uname:{
		type: String,
		unique: true
	} //用于记录学生的用户名，内容唯一
},{toJSON:{virtuals:true}});

StudentSchema.statics = {
	getSchedule: function(sid,cb){
		// 由于暂时没有添加学生的信息，因此先把所有的课程显示出来
		return Course.find({})
					 .populate({path:'_time', select:' -_id'})
					 .populate({path:'_classroom', select:' -_id'})
					 //.select('id name time')
					 //.select({id:1, name:1,credit:1,time:1,classroom:1})
					 //.select({id:1, name:1,credit:1, _time.day:1,_time.time:1,_classroom.campus:1,_classroom.building:1})
					 .exec(function(err,res){
					 	// console.log(res.haha);
					 	// console.log(res.time);
					 	// console.log(res.classroom);
					 	cb(err,res);
					 });
	}
}


module.exports = StudentSchema;
