var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var ExamSchema = new Schema({
	  course:{type:Schema.Types.ObjectId, ref:'Course'}
	, day: Date
	, time: {
		// TODO to be finished
		type: String
	}
	, building:{type:Schema.Types.ObjectId, ref:'Classroom'}
})

module.exports = ExamSchema;
