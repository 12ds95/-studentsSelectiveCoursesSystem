var mongoose = require('mongoose');
var Department = require("../models/Department");
var Teacher = require("../models/Teacher");
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
};
module.exports = PrecourseSchema;