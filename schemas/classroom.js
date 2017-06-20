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

ClassroomSchema.statics = {
    findByNumberAndCampus: function(number, campus, cb){
		this.find({'campus':campus})
			.exec(function(err,res){
				if(err){console.log('Error in Classroom findByNumber');}
				var result = res[number];
				cb(result);
			});
	}
}
module.exports = ClassroomSchema;
