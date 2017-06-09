var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/test");

var Schema = mongoose.Schema;
var PersonSchema = new Schema({
    name    : String
  , age     : Number
  , stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});
var StorySchema = new Schema({
    _creator : { type: Schema.Types.ObjectId, ref: 'Person' }
  , title    : String
  , fans     : [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});
var Story  = mongoose.model('Story', StorySchema);
var Person = mongoose.model('Person', PersonSchema);
module.exports = Story;

var aaron = new Person({name: 'Aaron', age: 100});
console.log(aaron);

aaron.save(function (err) {
  if (err) console.log(err);

  var story1 = new Story({
      title: "A man who cooked Nintendo"
    , _creator: aaron._id
  });
  story1.save(function (err) {
    if (err) console.log(err);
    Person.findOne({name: "Aaron"}).populate('stories')
            .exec(function (err, person) {
      if (err) console.log(err);
      console.log("person =", person);
      console.log("person.stories =", person.stories[0]);
    })

    Story.findOne({title: /Nintendo/i}).populate('_creator')
            .exec(function (err, story) {
      if (err) console.log(err);
      console.log("story =", story);
    });
    Person.findOne({name:"Aaron"},function(err,res){
    	console.log("Final person = ",res);
    })
  });
});

console.log("finish!");

