var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/User');

var userSchema = require('../schemas/User.js'); //引入'../schemas/movie.js'导出的模式模块

// 编译生成movie模型
var User = mongoose.model('User', userSchema);

// 将movie模型[构造函数]导出
module.exports = User;