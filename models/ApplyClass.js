var mongoose = require('mongoose')
    , ApplyClassSchema = require('../schemas/apply_class')
    , ApplyClass = mongoose.model('ApplyClass',ApplyClassSchema)
    ;

module.exports = ApplyClass;