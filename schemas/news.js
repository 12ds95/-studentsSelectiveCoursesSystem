var mongoose = require('mongoose');

var NewsSchema = new mongoose.Schema({
	content:String,
	title:String,
	createAt:{
		type: Date,
		default: Date.now()
	},
	updateAt:{
		type:Date,
		default: Date.now()
	},
	department:{
		type:mongoose.Schema.Types.ObjectId, 
		ref:'Department'
	}
});

NewsSchema.pre('save',function(next){
	if (this.isNew) {
		this.createAt = this.updateAt = Date.now();
	}else{
		this.updateAt = Date.now();
	}
	next();
});

NewsSchema.statics ={
	fetch: function(cb){
		return this;
			.find({});
			.sort('updateAt');
			.exec(cb);
	}
};


module.exports = NewsSchema;
