var   mongoose = require('mongoose')
	, Department = require('../models/Department')
	, User = require('../models/User')
	, assert = require('assert')
	;
var TeacherSchema = new mongoose.Schema({
	name:String,
	ismale:Boolean,
	uname:{ // 登录系统使用的用户名
		type: String,
		unique: true
	},
	id:{type: String, unique:true},
	_department:{type:mongoose.Schema.Types.ObjectId, ref:'Department'},
	phone_number: String,
	info: String
},{toJSON:{virtuals:true}});

TeacherSchema.virtual('department').get(function(){
	// var resstring = "";
	// 直接返回系的名字
	return this._department.dept_name;
});

TeacherSchema.statics = {
	getTeacherList: function(cb){
		return this.find({})
					  .populate({path:'_department',select:'-_id'})
					  .sort('id')
					  .exec(function(err,res){
					  	cb(err,res);
					  });

	},
	findById: function (tid, cb) {
		return this
			.find({id:tid})
			.populate('_department')
			.exec(function (err, res) {
				cb(err,res);
			});
	},
    getTwentyTeacher: function (from, to, cb) {
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

TeacherSchema.pre('save',function(next){
	var _user = new User({
		name:this.uname
		, password:'123456' 	//default password
	});
	_user.save(function(err,res){
		assert.equal(err,null);
		console.log("A new user added!",res);
		next();
	})
})


module.exports = TeacherSchema;
