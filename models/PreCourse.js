var mongoose = require('mongoose')
  , PreCourseSchema = require('../schemas/precourse')
  , PreCourse = mongoose.model('PreCourse', PreCourseSchema)
  ;

module.exports = PreCourse