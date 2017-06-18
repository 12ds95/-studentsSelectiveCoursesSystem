var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost/test';
mongoose.connect(dbUrl);
mongoose.set('debug', true);

var User = require('../models/User.js');
var News = require('../models/News.js');


User.findOne({name: "Edm"},function(err,user){
    if(err){
        console.log("User.findOne error"+err);
    }else{
        console.log("User.findOne: Edm");
        console.log(user);
    }
});

User.findOne({name: "Anthony"},function(err,user){
    if(err){
        console.log("User.findOne error"+err);
    }else{
        console.log("User.findOne: Anthony");
        console.log(user);
    }
});

User.getUserType("Edm",function (err,usertype) {
    if(err){
        console.log("User.getUserType error"+err);
    }else{
        console.log("User.getUserType: Edm");
        console.log(usertype);
    }
});

// User.getUserType("Anthony",function (err,usertype) {
//     if(err){
//         console.log("User.getUserType error"+err);
//     }else{
//         console.log("User.getUserType: Anthony");
//         console.log(usertype);
//     }
// });

News.getAPage(0,20,function(pageResult){
    console.log("News.getAPage 0 20");
    console.log(pageResult);
});

News.getAPage(1,20,function(pageResult){
    console.log("News.getAPage 1 20");
    console.log(pageResult);
});

News.getAPage(1,200,function(pageResult){
    console.log("News.getAPage 1 200");
    console.log(pageResult);
});

News.getAPage(100,20,function(pageResult){
    console.log("News.getAPage 100 20");
    console.log(pageResult);
});

News.getNumberOfPages(20,function(totalPages){
    console.log("News.getNumberOfPages 20");
    console.log(totalPages);
});
