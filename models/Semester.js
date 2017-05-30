var mongoose = require('mongoose')
  , SemesterSchema = require('../schemas/semester')
  , Semester = mongoose.model('Semester',SemesterSchema)
  ;

module.exports = Semester;
