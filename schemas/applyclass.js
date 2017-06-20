// 用于记录进行补选申请的学生的信息
// 补选学生学生池

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ApplyClassSchema = new Schema({
      sid:{type:String, alias:'id'}  // 用于记录学生的学号
    , tid:{type:String}  // 用于记录开课老师的教工号
    , cid:{type:String}  // 用于记录所选课程的的课程编号
    , reason:String
},{toJSON:{virtuals:true}});

ApplyClassSchema.statics = {
    fetchStu:function(tid,cid,cb){
        return this.find({tid:tid,cid:cid})
            .sort('sid')
            .exec(function (err, res) {
                cb(err,res);
            });
    }
};

module.exports = ApplyClassSchema;
