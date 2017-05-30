var mongoose = require('mongoose')
  , TeacherSchema = require('../schemas/teacher')
  , Teacher = mongoose.model('Teacher',TeacherSchema)
  ;

module.exports = Teacher;
