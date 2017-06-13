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

StudentSchema.virtual('department').get(function(){
	return this._department.dept_name;
});

StudentSchema.statics = {
	getSchedule: function(sid,cb){
		// 由于暂时没有添加学生的信息，因此先把所有的课程显示出来
		return Course.find({})
					 .populate({path:'_time', select:' -_id'})
					 .populate({path:'_classroom', select:' -_id'})
					 .exec(function(err,res){
					 	cb(err,res);
					 });
	}
	,
	getStudentList:function(cb){
		return Student.find({})
					  .populate({path:'_department',select:'-_id'})
					  .sort('id')
					  .select('id name _department')
					  .exec(function(err,res){
					  	cb(err,res);
					  });
	}
	,
	getTwentyStudent:function (from, to, cb) {
		this.find({})
			.populate({path:'_department'})
			.sort('id')
			.select('id name _department')
			.exec(function(err, res){
				var i, result;
				if(res.length < from + 1)cb(result);
				for(i=from;i<res.length&&i<=to;i++)
					result[i-from]=res[i];
				cb(result);
			});
	}
};


module.exports = StudentSchema;
