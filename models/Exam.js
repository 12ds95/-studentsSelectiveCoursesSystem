var mongoose = require('mongoose')
  , ExamSchema = require('../schemas/exam')
  , Exam = mongoose.model('Exam',ExamSchema)
  ;

module.exports = Exam;
