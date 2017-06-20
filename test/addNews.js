var News = require('../models/News')
    , assert = require('assert')
    , mongoose = require('mongoose')
    ;
mongoose.connect('mongodb://localhost/test');
mongoose.Promise = global.Promise;

var new1 = new News({
    title: "大大大大新闻"
    , content:"计算机学院开始选导师了"
    , department: "计算机学院"
});

var new2 = new News({
    title:  "关于本科生第二轮选课的通知"
    , content:"第二轮选课就要开始了，大家快快来选课吧"
    , department: "本科生院"
});

new1.save(function(err,res){
    assert.equal(err,null);
    new2.save(function(err2,res2){
        assert.equal(err2,null);;
        console.log("News import success!");
        mongoose.disconnect();
    });
});
