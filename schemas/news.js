var mongoose = require('mongoose')
	, assert = require('assert')
	;
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
		, alias:'date'
	},
	department:{
		type: String
		, alias: 'author'
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
		return this
			.find({})
			.sort('updateAt')
			.exec(cb)
	}
	,
    getAPage: function (pageNum,pageSize, cb) {
		var skipNum = (pageNum - 1) * pageSize;
        this.find({})
            .sort('createAt')
			.skip(skipNum)
			.limit(pageSize)
            //.select('content title')
            .exec(function(err, pageResult){
				assert.equal(err,null);
				cb(pageResult);
            });
    },
	getNumberOfPages:function(pageSize,cb){
		var number;
		this.find({},function(err,result){
			assert.equal(err,null);
			number = Math.ceil(result.length / pageSize);
			cb(number);
		});
	}
};


module.exports = NewsSchema;
