var mongoose = require('mongoose');

var DepartmentSchema = require('../schemas/department');
var Department = mongoose.model('Department', UserSchema);

module.exports = Department;