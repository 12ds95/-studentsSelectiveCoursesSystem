var mongoose = require('mongoose');
var Department = require('../models/Department');

mongoose.connect('mongodb://localhost/test');
mongoose.Promise = global.Promise;

var de1 = new Department({

      dept_name :'aha'
    , building:'building4'
    , id:123456
});
de1.save(function (err, res) {
    if (err) {
        console.log(err);
    }
    console.log(res)
});