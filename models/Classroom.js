var mongoose = require('mongoose')
  , ClassroomSchema = require('../schemas/classroom')
  , Classroom = mongoose.model('Classroom',ClassroomSchema)
  ;

module.exports = Classroom;
