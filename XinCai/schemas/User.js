var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    UserId: String,
    Password: String,
    Type: String
});

// userSchema 模式的静态方法
userSchema.statics = {
    findById: function (id, cb) {
        return this
            .findOne({'UserId': id})
            .exec(cb)
    }
};

module.exports = userSchema;

