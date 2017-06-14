var mongoose = require('mongoose');
var   bcrypt = require('bcrypt')
    , Student = require('../models/Student')
    , Teacher = require('../models/Teacher')
;

var SALT_WORK_FACTOR = 10;
var UserSchema = new mongoose.Schema({
    name:{
        unique:true,
        type:String
    },
    password:{
        unique:false,
        type:String
    },
    // 0 - admin, 1 - teacher, 2 - student
    user_type:Number 
});

UserSchema.methods = {
    comparePassword: function(_password,cb){
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
        if (err){
            var innerr = new Error(err);
            next(innerr);
        }
        bcrypt.hash(user.password,salt,function(err,hash){
            if (err) {
                var innerr = new Error(err);
                next(innerr);
            }
            user.password = hash;
            console.log('Saved password: '+hash);
            next()
        })
    })
});

UserSchema.statics = {
    fetch: function(cb){
        return this
            .find({})
            .sort('name')
            .exec(cb)
    },
    findByName:function(name,cb){
        return this
            .findOne({name:name})
            .exec(cb)
    },
    getUserType: function(uname,cb){
        this.findOne({name: uname},function(err,res){
            assert.equal(err,null);
            cb(null,res.user_type);
        });
    }
};
module.exports = UserSchema;