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

var room1 = new Classroom({
	  building: "曹光彪楼"
	, room_number: 104
	, capacity: 120
	, campus: "玉泉"
});

var room2 = new Classroom({
	  building:"曹光彪楼"
	, room_number: 202
	, capacity: 90
	, campus: "玉泉"
})

console.log('begin');
time11.save(function(err,res){
	console.log('In function time1.save');
	if (err) {console.log('Error in time1.save()\n',err);}
	time12.save(function(err,res){
		if (err) {console.log('Error in time1.save()\n',err);}
		room1.save(function(err,res){
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
				, _classroom:[room1._id, room1._id]
			});
			course1.save(function(err,res){
				if (err) {console.log('Error in course1.save()\n',err);}
				console.log('Insert success!');
				// Course.find({}).populate(time).populate(classroom).exec(function(err,doc){
				// 	console.log(doc);
				// })
			});
		});
	});
});