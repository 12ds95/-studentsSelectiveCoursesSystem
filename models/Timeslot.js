var mongoose = require('mongoose')
  , TimeslotSchema = require('../schemas/timeslot')
  , Timeslot = mongoose.model('Timeslot',TimeslotSchema)
  ;

module.exports = Timeslot;
