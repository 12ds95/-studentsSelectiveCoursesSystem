var mongoose = require('mongoose');
var Department = require("../models/Department");
var Teacher = require("../models/Teacher");
var Course = require("../models/Course");
var Timeslot = require("../models/Timeslot");
var Classroom = require("../models/Classroom");
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
    , date:String
},{toJSON:{virtuals:true},toObject:{virtuals:true}});

PrecourseSchema.virtual('userName').get(function(){
    return  this._teacher.name;
});
PrecourseSchema.pre('save', function(next){
    var nowdate = new Date();
    var tmp1 = nowdate.toLocaleDateString();
    var tmp2 = nowdate.toLocaleTimeString();
    this.date = tmp1 + ' ' + tmp2;
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
    findOneCourse: function(time, cb){
        var whereStr = {'date':time};
        this.find(whereStr, function(err, result){
            if(err){
                console.log('Error in findOneCourse:'+err);
                return ;
            }
            var list = {
                  'classname':result[0].name
                , 'Engclassname':result[0].ename
                , 'department' : result[0].department
                , 'classhours' : result[0].time_one_week
                , 'credit' : result[0].credit
                , 'classtype' : result[0].course_type
                , 'preparation' : result[0].prestudy
                , 'capacity' : result[0].capacity
                , 'objectstudent' : result[0].what_student
                , 'campus' : result[0].campus
                , 'classinfo' : result[0].info
                , '_id' : result[0].date
                , '_teacher' : result[0]._teacher
            };
            cb(list);
        });
    }
    ,
    deleteOneCourse: function(_id, cb){
        var whereStr = {'date':_id};
        this.remove(whereStr, function(err){
            if(err){
                console.log('Error in deleteOneCourse:'+ err);
                cb(0);
            }
            else cb(1);
        })
    }
    ,
    confirmOneCourse: function(_id, cb) {
        var whereStr = {'date': _id};
        this.find(whereStr, function (err, preCourseInfo) {
            if (err) { console.log('Error in confirmOneCourse:' + err); }
            var count = Math.floor(preCourseInfo[0].time_one_week);
            var timeIndex = new Array();
            var has_arr = new Array();
            var temp = '';
            for (var i = 0; i < count; i++) {
                do {
                    temp = Math.round(Math.random() * 56);
                } while (has_arr[temp] !== undefined)
                has_arr[temp] = 'has';
                timeIndex[i] = temp;
            }
            timeIndex.sort(function (a, b) {
                return a - b
            });//升序排列
            var roomIndex = Math.round(Math.random() * 100);
            Timeslot.findByIndex(timeIndex, function (timeRes) {
                Classroom.findByNumberAndCampus(roomIndex, preCourseInfo[0].campus, function (roomRes) {
                    Course.find()
                        .sort('id')
                        .exec(function(err, courseExist){
                            if(courseExist.length == 0)temp = 100000;
                            else {
                                var temp = courseExist[courseExist.length-1];
                                temp = parseInt(temp.id);
                                temp++;
                            }
                            var newCourse = new Course({
                                  id: temp
                                , name: preCourseInfo[0].name
                                , credit: preCourseInfo[0].credit
                                , courese_info: preCourseInfo[0].info
                                , course_type: preCourseInfo[0].course_type
                                , _teacher: preCourseInfo[0]._teacher
                                , semester: '春夏'
                                , capacity: preCourseInfo[0].capacity
                                , campus: preCourseInfo[0].campus
                                //, exam:
                                , _stulist:[]
                                //, english:preCourseInfo.ename
                                //, department:preCourseInfo.department
                                //, hour:preCourseInfo.time_one_week
                                //, prerequistite:preCourseInfo.prestudy
                                //, syllabus:preCourseInfo.course_info
                            });
                            for (var i = 0; i < timeRes.length; i++) {
                                newCourse._time[i] = timeRes[i]._id;
                                newCourse._classroom[i] = roomRes._id;
                            }
                            global.courseID = global.courseID + 1;
                            newCourse.save(function (err) {
                                if (err) {
                                    console.log("Error in newCourse.save:" + err);
                                    cb(0);
                                }
                                else cb(1);
                            });
                        })

                    }
                );
            });
        });
    }
};
module.exports = PrecourseSchema;