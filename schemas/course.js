var mongoose = require('mongoose');
var CourseSchema = new mongoose.Schema({
	cname:{
		type: String
	},
	credit: Double,
	course_info: String
	// course_type: 暂时不考虑
	// tid:String, // teacher's id
});

CourseSchema.pre('save',function(next){
	next();
});

module.exports = CourseSchema;
