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
		return this
			.find({})
			.sort('updateAt')
			.exec(cb)
	}
	,
    getTwentyNews: function (from, to, cb) {
        this.find({})
            .sort('createAt')
            .select('content title')
            .exec(function(err, res){
                var i, result;
                if(res.length < from + 1)cb(result);
                for(i=from;i<res.length&&i<=to;i++)
                    result[i-from]=res[i];
                cb(result);
            });
    }
};


module.exports = NewsSchema;
