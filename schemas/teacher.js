var   mongoose = require('mongoose')
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

	}			
};


module.exports = TeacherSchema;
