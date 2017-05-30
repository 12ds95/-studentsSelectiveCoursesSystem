var mongoose = require('mongoose');

var ClassroomSchema = new mongoose.Schema({
	building:String,
	room_number:Number,
	capacity:Number,
	campus:{
		type:String,
		enum:['紫金港','玉泉','西溪','华家池','之江','舟山','海宁']
	}
});

module.exports = ClassroomSchema;
