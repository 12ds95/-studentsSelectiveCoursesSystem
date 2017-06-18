var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var TimeslotSchema = new Schema({
	  day:{
		type:String,
		enum:['周一','周二','周三','周四','周五','周六','周日',]
	}
	, time:{
		type:String,
		enum:['第1,2节','第3,4节','第5节','第6节',
			  '第7,8节','第9,10节','第11,12节','第13节',]
	}
	// TODO需要考虑是否要把学期的模块单独拎出来
	// , semester:{
	// 	type:string,
	// 	enum:['春','夏','秋','冬','短']
	// }
});

TimeslotSchema.statics = {
	findByIndex: function(index, cb){
		this.find({})
			.exec(function(err, res){
				if(err){console.log('Error in Timeslot findByIndex:' + err)}
				var result = new Array();
				for(var i = 0; i < index.length; i++){
					result[i] = res[index[i]];
				}
				cb(result);
			});
	}
};

// Time slot 用于把一天划分为多个时间段
// 每门课程占据一个或者多个slot

module.exports = TimeslotSchema;
