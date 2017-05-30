var mongoose = require('mongoose')
  , StudentSchema = require('../schemas/student')
  , Student = mongoose.model('Student',StudentSchema)
  ;

module.exports = Student;
