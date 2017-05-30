var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new mongoose.Schema({
	id : {
		type: String,
		unique: true
	},
	name:String,
	ismale:Boolean,
	credit:Double,

	department:{type:Schema.Types.ObjectID, ref:'Department'},
	uname:{
		type: String,
		unique: true
	} //用于记录学生的用户名，内容唯一
});


module.exports = StudentSchema;
