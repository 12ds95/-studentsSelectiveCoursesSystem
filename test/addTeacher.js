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
            , uname:'teacher1'
            , id:'12224521'
            , _department:department1._id
            , phone_number:"123456"
            , info:"no"
        })
        teacher1.save(function (err, res) {
            if(err) {console.log('Error in teacher1.save()\n',err);}
        })
        var teacher2 = new Teacher({
              name:"老师2"
            , ismale:true
            , uname:'teacher2'
            , id:"teacher2"
            , _department:department2._id
            , phone_number:"123456789"
            , info:"yes"
        })
        teacher2.save(function (err, res) {
            if(err) {console.log('Error in teacher2.save()\n',err);}
        })
    })
})