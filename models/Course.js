var mongoose = require('mongoose')
  , CourseSchema = require('../schemas/course')
  , Course = mongoose.model('Course',CourseSchema);

module.exports = Course;