var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var SemesterSchema = new Schema({
	semester:{
		type:String,
		enum:['春','夏','秋','冬','短']
	}
});

module.exports = SemesterSchema;