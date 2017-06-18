var mongoose = require('mongoose');
var Student = require('../models/Student');
mongoose.connect('mongodb://localhost/test');
mongoose.Promise = global.Promise;

var stu1 = new Student({
      id:'3140104200'
    , uname:'3140104200'
    , name:'Edm'
    , ismale:true
    , credit:160
    , department:'计算机科学与技术'
});

var stu2 = new Student({
      id:'3140104201'
    , name:'hello'
    , uname:'3140104201'
    , ismale:false
    , credit:150
    , department:'计算机科学与技术'
});

var stu3 = new Student({
      id:'3140104203'
    , name:'word'
    , uname:'3140104203'
    , credit:170
    , department:'软件工程'
});


stu1.save(function (err, res) {
    stu2.save(function (err, res) {
        stu3.save(function (err, res) {
            console.log("Save student successfully!");
            mongoose.disconnect();
        });
    });
});




