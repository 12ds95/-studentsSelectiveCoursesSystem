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
	_course_list:[{type:Schema.Types.ObjectId, ref:'Course'}],
	// 以下内容纯属为个人信息
	address:String,
	email:String,
	phone:String,
	// photo
	uname:{
		type: String,
		unique: true
	} //用于记录学生的用户名，内容唯一
},{toJSON:{virtuals:true}});

StudentSchema.statics = {
	getSchedule: function(sid,cb){
		this.findOne({id:sid})
			.populate({path:'_course_list',select:'-_id'
			,populate:{path:'_time _classroom'}})
			//.populate({path:'_time', select:' -_id'})
			//.populate({path:'_classroom', select:' -_id'})
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
	,
	getLowCredit: function(cb){
		this.find({credit:{$lt:15}})
			.exec(function(err, result){
				var LowResult = new Array();
				for(var i = 0; i < result.length; i++){
					var temp = {};
					temp.id = result[i].id;
					temp.name = result[i].name;
					temp.sex = result[i].ismale;
					temp.credits = result[i].credit;
					temp.department = result[i].department;
					temp.userName = result[i].uname;
					LowResult[i] = temp;
				}
				cb(LowResult);
			})
	}
};

StudentSchema.pre('save',function(next){
	var curID = this.id;
	var User = require('../models/User');
	this.uname = this.id;
	User.findOne({name:curID},function(err,res){
		if(res != null){ next(); } 
		// User already exists do nothing

		else {
			var _user = new User({
				name : curID
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

StudentSchema.pre('remove',function(next){
	var curID = this.id;
	var User = require('../models/User');
	User.remove({name:curID},function(err,res){
		next();
	})
})

module.exports = StudentSchema;
