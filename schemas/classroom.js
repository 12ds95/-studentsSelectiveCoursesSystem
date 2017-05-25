var mongoose = require('mongoose');

var ClassroomSchema = new mongoose.Schema({
	building:String,
	room_number:Number,
	capacity:Number
});

module.exports = ClassroomSchema;
