var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/test");
var Story = require('./test');

Story.find({}).populate({path:'_creator',select:'name age'}).exec(function(err,res){
	if (err) {console.log("err",err);}
	else{
		console.log("res:\n",res);
	}
})