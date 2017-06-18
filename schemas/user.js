var mongoose = require('mongoose');
var   bcrypt = require('bcrypt')
    , Student = require('../models/Student')
    , Teacher = require('../models/Teacher')
    , assert = require('assert')
;

var SALT_WORK_FACTOR = 10;
var UserSchema = new mongoose.Schema({
    name:{
        unique:true,
        type:String
    },
    password:{
        type:String
    },
    // 0 - admin, 1 - teacher, 2 - student
    user_type:Number 
});

UserSchema.methods = {
    comparePassword: function(_password,cb){
        console.log("_password");
        console.log(_password);
        console.log("this.password");
        console.log(this.password);
        bcrypt.compare(_password,this.password,function (err,isMatch){
            if (err) {
                return cb(err)
            }
            cb(null,isMatch)
        })
    }

};

UserSchema.pre('save',function(next){
    var user = this;
    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
        console.log("genSalt");
        console.log(salt);
        if (err){
            var innerr = new Error(err);
            next(innerr);
        }
        bcrypt.hash(user.password,salt,function(err,hash){
            if (err) {
                var innerr = new Error(err);
                next(innerr);
            }
            console.log("hash");
            console.log(hash);
            user.password = hash;
            console.log('Saved password: '+hash);
            next()
        })
    })
});

UserSchema.statics = {
    fetch: function(cb){
        console.log("statics");
        return this
            .find({})
            .sort('name')
            .exec(cb)
    },
    findByName:function(name,cb){
        console.log("findByName");
        return this
            .findOne({name:name})
            .exec(cb)
    },
    getUserType: function(uname,cb){
        console.log("getUserType");
        this.findOne({name: uname},function(err,res){
            console.log("findOne");
            console.log(res);
            assert.equal(err,null);
            cb(null,res.user_type);
        });
    }
};
module.exports = UserSchema;