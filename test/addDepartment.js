var mongoose = require('mongoose');
var Department = require('../models/Department');

mongoose.connect('mongodb://localhost/test');
mongoose.Promise = global.Promise;

var de1 = new Department({
      id:100001
    , dept_name :'计算机学院'
    , building:'计算机学院大楼'
});
var de2 = new Department({
      id:100002
    , dept_name :'信电学院'
    , building:'信电学院大楼'
});
var de3 = new Department({
      id:100003
    , dept_name :'马克思学院'
    , building:'马克思学院大楼'
});
var de4 = new Department({
      id:100004
    , dept_name :'数学学院'
    , building:'数学学院大楼'
});
var de5 = new Department({
      id:100005
    , dept_name :'人文学院'
    , building:'人文学院大楼'
});
de1.save(function (err, res) {
    if (err) { console.log(err); }
    console.log(res)
});
de2.save(function (err, res) {
    if (err) { console.log(err); }
    console.log(res)
});
de3.save(function (err, res) {
    if (err) { console.log(err); }
    console.log(res)
});
de4.save(function (err, res) {
    if (err) { console.log(err); }
    console.log(res)
});
de5.save(function (err, res) {
    if (err) { console.log(err); }
    console.log(res)
});