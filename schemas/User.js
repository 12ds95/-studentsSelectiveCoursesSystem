var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10
var UserSchema = new mongoose.Schema({
    name:{
        unique:true,
        type:String
    },
    password:{
        unique:false,
        type:String
    }
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
            return next('Error at genSalt:'+ err)
        }
        bcrypt.hash(user.password,salt,function(err,hash){
            if (err) {
                return next(err)
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
    }
};
module.exports = UserSchema;