var Timeslot = require('../models/Timeslot');
var Course = require('../models/Course');
var Classroom = require('../models/Classroom');
var mongoose = require('mongoose');
var Department = require('../models/Department')
var Teacher = require('../models/Teacher')
mongoose.connect('mongodb://localhost/test')
mongoose.Promise = global.Promise;

var department1 = new Department({
      dept_name: "计算机学院"
    , building: "曹光彪大楼"
});

var department2 = new Department({
      dept_name: "信电学院"
    , building: "随便啥楼"
});

console.log("save teacher begin");
department1.save(function(err, res){
    if(err) {console.log('Error in department1.save()\n',err);}
    department2.save(function (err, res) {
        if(err) {console.log('Error in department2.save()\n',err);}
        var teacher1 = new Teacher({
              name:"老师1"
            , ismale:true
            , uname:{type:"teacher1", unique:true}
            , id:{type:"teacher1", unique:true}
            , department:[department1.id]
            , phone_number:"123456"
            , info:"no"
        })
        teacher1.save(function (err, res) {
            if(err) {console.log('Error in teacher1.save()\n',err);}
        })
        var teacher2 = new Teacher({
            name:"老师2"
            , ismale:true
            , uname:{type:"teacher2", unique:true}
            , id:{type:"teacher2", unique:true}
            , department:[department2.id]
            , phone_number:"123456789"
            , info:"yes"
        })
        teacher1.save(function (err, res) {
            if(err) {console.log('Error in teacher2.save()\n',err);}
        })
    })
})