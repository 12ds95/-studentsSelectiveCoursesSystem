// 自动向数据库中添加数据

var Timeslot = require('../models/Timeslot');
var Course = require('../models/Course');
var Classroom = require('../models/Classroom');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test')
mongoose.Promise = global.Promise;

var time11 = new Timeslot({
	  day: "周一"
	, time:"第1,2节"
});
var time12 = new Timeslot({
	  day: "周一"
	, time:"第3,4节"
});
var time13 = new Timeslot({
	  day: "周一"
	, time:"第5节"
});
var time14 = new Timeslot({
	  day: "周一"
	, time:"第6节"
});
var time15 = new Timeslot({
	  day: "周一"
	, time:"第7,8节"
});
var time16 = new Timeslot({
	  day: "周一"
	, time:"第9,10节"
});
var time17 = new Timeslot({
	  day: "周一"
	, time:"第11,12节"
});
var time18 = new Timeslot({
	  day: "周一"
	, time:"第13节"
});
var time21 = new Timeslot({
    day: "周一"
    , time:"第1,2节"
});
var time22 = new Timeslot({
    day: "周一"
    , time:"第3,4节"
});
var time23 = new Timeslot({
    day: "周一"
    , time:"第5节"
});
var time24 = new Timeslot({
    day: "周一"
    , time:"第6节"
});
var time25 = new Timeslot({
    day: "周一"
    , time:"第7,8节"
});
var time26 = new Timeslot({
    day: "周一"
    , time:"第9,10节"
});
var time27 = new Timeslot({
    day: "周一"
    , time:"第11,12节"
});
var time28 = new Timeslot({
    day: "周一"
    , time:"第13节"
});

var room11 = new Classroom({
	  building: "曹光彪楼"
	, room_number: 103
	, capacity: 120
	, campus: "玉泉"
});
var room12 = new Classroom({
    building: "曹光彪楼"
    , room_number: 104
    , capacity: 120
    , campus: "玉泉"
});
var room21 = new Classroom({
	  building:"西区教学楼"
	, room_number: 201
	, capacity: 120
	, campus: "紫金港"
})
var room22 = new Classroom({
    building:"西区教学楼"
    , room_number: 202
    , capacity: 120
    , campus: "紫金港"
})

console.log('begin');
time11.save(function(err,res){
	if (err) {console.log('Error in time1.save()\n',err);}
	time12.save(function(err,res){
		if (err) {console.log('Error in time1.save()\n',err);}
		room11.save(function(err,res){
			if (err) {console.log('Error in room1.save()\n',err);}
			var course1 = new Course({
				  id:"230202030"
				, name:"编译原理"
				, credit: 3.5
				, course_info:"期末作业：编译器"
				, course_type:"专业模块课"
				, capacity:100
				, campus: "玉泉"
				, semester:"春夏"
				, _time:[time11._id, time12._id]
				, _classroom:[room11._id, room11._id]
			});
			course1.save(function(err,res){
				if (err) {console.log('Error in course1.save()\n',err);}
				console.log('Insert success!');
			});
		});
		room21.save(function (err, res) {
			if(err){console.log('Error in room2.save()\n', err);}
			var course2 = new Course({
				  id:"011L0010"
				, name:"当代中国经济"
				, credit: 2.0
				, course_info:"通识课程,写论文"
				, course_type:"通识课程"
				, capacity:120
				, campus:"紫金港"
				, semester:"春"
				, _time:[time11.id, time12.id]
				, _classroom:[room21._id, room21._id]
			});
        })
	});
});
time14.save(function(err,res){
    if (err) {console.log('Error in time14.save()\n',err);}
    time15.save(function(err,res){
        if (err) {console.log('Error in time15.save()\n',err);}
        room11.save(function(err,res){
            if (err) {console.log('Error in room11.save()\n',err);}
            var course1 = new Course({
                id:"14532441"
                , name:"计算机组成"
                , credit: 2.5
                , course_info:"一堆实验"
                , course_type:"专业必修课"
                , capacity:100
                , campus: "玉泉"
                , semester:"春夏"
                , _time:[time14._id, time15._id]
                , _classroom:[room11._id, room11._id]
            });
            course1.save(function(err,res){
                if (err) {console.log('Error in course1.save()\n',err);}
                console.log('Insert success!');
            });
        });
        room21.save(function (err, res) {
            if(err){console.log('Error in room2.save()\n', err);}
            var course2 = new Course({
                id:"011L0010"
                , name:"当代中国经济"
                , credit: 2.0
                , course_info:"通识课程,写论文"
                , course_type:"通识课程"
                , capacity:120
                , campus:"紫金港"
                , semester:"春"
                , _time:[time11.id, time12.id]
                , _classroom:[room2._id, room2._id]
            });
        })
    });
});
