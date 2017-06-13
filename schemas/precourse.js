var mongoose = require('mongoose');
var Department = require("../models/Department");
var Teacher = require("../models/Teacher");
var Course = require("../models/Course");
var Schema = mongoose.Schema;
var PrecourseSchema = new mongoose.Schema({
      name:{type:String, alias:'courseName'}
    , ename:String
    , department:String
    , time_one_week:String
    , credit:Number
    , course_type:{type:String, alias:'type'}
    , prestudy:String
    , _teacher:{type:Schema.Types.ObjectId, ref:'Teacher'}
    , capacity: Number
    , what_student:String
    , campus:{type:String, enum:['紫金港','玉泉','西溪','华家池','之江','舟山','海宁']}
    , info:String
    , date:Date
},{toJSON:{virtuals:true},toObject:{virtuals:true}});

PrecourseSchema.virtual('userName').get(function(){
    return  this._teacher.name;
});
PrecourseSchema.pre('save', function(next){
    this.date = Date.now();
    next();
});

PrecourseSchema.statics = {
    getAll: function (sid, cb) {
        return this.find({})
            .populate({path:'_teacher'})
            .exec(function (err, res) {
                cb(err, res);
            });
    }
    ,
    saveOneCourse: function (item, cb) {
        item.save(function(err, res){
            cb(err);
        });
    }
    ,
    confirmOneCourse: function(time, cb){
        var where;
        for(where in time){break;}
        var whereStr = {"data":where};
        this.find(whereStr).toArray(function(err, result){
            if(err){
                console.log('Error in confirmOneCourse:'+err);
                return ;
            }
            var newcourse = new Course({
                //TODO 新建一个课程（随机一些数据）然后插入course中
            })

        });
    }
};
module.exports = PrecourseSchema;