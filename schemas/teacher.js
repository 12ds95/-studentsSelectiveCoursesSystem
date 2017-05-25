var mongoose = require('mongoose');

var TeacherSchema = new mongoose.Schema({
	name:String,
	ismale:Boolean,
	uname:{ // 登录系统使用的用户名
		type: String,
		unique: true
	},
	phone_number: String,
	info: String
});


module.exports = TeacherSchema;
