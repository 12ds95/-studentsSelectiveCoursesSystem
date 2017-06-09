var mongoose = require('mongoose');

var DepartmentSchema = new mongoose.Schema({
	dept_name: String,
	building: String
},{toJSON:{virtuals:true},toObject:{virtuals:true}});

module.exprots = DepartmentSchema;
