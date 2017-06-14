var   mongoose = require('mongoose')
	, Department = require('../models/Department')
	, User = require('../models/User')
	, assert = require('assert')
	;
// var test = new User({
// 	name :'testUser'
// 	, password:'123456'
// 	, user_type:1
// })
var TeacherSchema = new mongoose.Schema({
	name:String,
	ismale:Boolean,
	uname:{ // 登录系统使用的用户名
		type: String,
		unique: true
	},
	id:{type: String, unique:true},
	// _department:{type:mongoose.Schema.Types.ObjectId, ref:'Department'},
	department:{type:String},
	phone_number: String,
	info: String
},{toJSON:{virtuals:true}});

// TeacherSchema.virtual('department').get(function(){
// 	// var resstring = "";
// 	// 直接返回系的名字
// 	return this._department.dept_name;
// });

TeacherSchema.statics = {
	getTeacherList: function(cb){
		return this.find({})
					 // .populate({path:'_department',select:'-_id'})
					  .sort('id')
					  .exec(function(err,res){
					  	cb(err,res);
					  });

	},
	findById: function (tid, cb) {
		return this
			.find({id:tid})
			.exec(function (err, res) {
				cb(err,res);
			});
	},
	// pageNum start from 1
    getAPage: function (pageNum,pageSize, cb) {
		var skipNum = (pageNum-1)*pageSize;

        this.find({})
           // .populate({path:'_department'})
            .sort('id')
			.skip(skipNum)
			.limit(pageSize)
            .select('id name department')
            .exec(function(err, result){
                assert.equal(err,null);
                cb(result);
            });
    },
	getNumberofTeacher:function(pageSize,cb){
		var number;
		this.find({},function(err,res){
			assert.equal(err,null);
			number =Math.ceil(res.length / pageSize); // BUG 此处返回值总是1?
			cb(number);
		})
	}
};

TeacherSchema.pre('save',function(next){
	// 在添加老师之前，先添加一个用户
	var _user = new User({
		name:this.uname
		, password:'123456' 	//default password
		, user_type: 1  	// teacher type
	});
	_user.save(function(err,res){
		assert.equal(err,null);
		console.log("A new user added!",res);
		next();
	})
});

TeacherSchema.pre('remove',function(next){
	User.remove({name:this.uname},function(err,res){
		assert.equal(err,null);
		next();
	})
})


module.exports = TeacherSchema;
