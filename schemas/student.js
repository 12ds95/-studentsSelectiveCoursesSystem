var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Course = require('../models/Course');
var Timeslot = require('../models/Timeslot')
  , Classroom = require('../models/Classroom')
  , assert = require('assert')
  ; 

var StudentSchema = new mongoose.Schema({
	id : {
		type: String,
		unique: true
	},
	name:String,
	ismale:Boolean,
	credit:Number,
	// replace by String:department
	// _department:{type:Schema.Types.ObjectId, ref:'Department'},
	department:String,
	_course_list:{type:Schema.Types.ObjectId, ref:'Course'},
	// 以下内容纯属为个人信息
	address:String,
	email:String,
	phone:String,
	uname:{
		type: String,
		unique: true
	} //用于记录学生的用户名，内容唯一
},{toJSON:{virtuals:true}});

StudentSchema.statics = {
	getSchedule: function(sid,cb){
		// 由于暂时没有添加学生的信息，因此先把所有的课程显示出来
		// return Course.find({})
		// 			 .populate({path:'_time', select:' -_id'})
		// 			 .populate({path:'_classroom', select:' -_id'})
		// 			 .exec(function(err,res){
		// 			 	cb(err,res);
		// 			 });
		return this.findOne({id:sid})
			.populate({path:'_course_list',select:'-_id'})
			.populate({path:'_time', select:' -_id'})
			.populate({path:'_classroom', select:' -_id'})
			.exec(function(err,res){
				cb(err,res._course_list);
			});
	}
	,
	getStudentList:function(cb){
		return Student.find({})
					  .sort('id')
					  .select('id name')
					  .exec(function(err,res){
					  	cb(err,res);
					  });
	}
	,
	// 使用 getAPage 来代替
	// getTwentyStudent:function (from, to, cb) {
	// 	// TODO 
	// 	this.find({})
	// 		.sort('id')
	// 		.select('id name')
	// 		.exec(function(err, res){
	// 			var i, result;
	// 			if(res.length < from + 1)cb(result);
	// 			for(i=from;i<res.length&&i<=to;i++)
	// 				result[i-from]=res[i];
	// 			cb(result);
	// 		});
	// },
	getAPage:function(pageNum,pageSize,cb){
		var skipNum = (pageNum - 1) * pageSize;
		this.find({})
			.sort('id')
			.skip(skipNum)
			.limit(pageSize)
			.exec(function(err,pageResult){
				assert.equal(err,null);
				cb(pageResult);
			});
	}
};
var User = require('../models/User');
StudentSchema.pre('save',function(next){
	User.findOne({name:this.id},function(err,res){
		if(res != null){ next(); } 
		// User already exists do nothing

		else {
			var _user = new User({
				// 为什么这里的this是空的啊？
				name : this.id
				, password: '123456'
				, user_type: 2
			});
			_user.save(function(err,res){
				assert.equal(err,null);
				console.log('Add a new student into user!');
				next();
			});
		}
	})
	
});

module.exports = StudentSchema;
