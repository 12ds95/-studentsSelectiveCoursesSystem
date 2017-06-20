var mongoose = require('mongoose')
    , ApplyClassSchema = require('../schemas/applyclass')
    , ApplyClass = mongoose.model('ApplyClass',ApplyClassSchema)
    ;

module.exports = ApplyClass;