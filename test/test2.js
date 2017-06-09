var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/test");
var Schema = mongoose.Schema;

var PersonSchema = new Schema({
    name    : String
  , age     : Number
  , friends : [{ type: Schema.ObjectId, ref: 'Person' }]
});

var Person = mongoose.model('Person', PersonSchema);

var aaron = new Person({ name: 'Aaron', age: 100 });
var bill = new Person({ name: 'Bill', age: 97 });

aaron.save(function (err) {
    if (err) throw err;
    bill.save(function(err) {
        if (err) throw err;
        var charlie = new Person({ name: 'Charlie', age: 97, friends: [aaron._id, bill._id] });
        charlie.save(function(err) {
            if (err) throw err;
            Person
            .findOne({name: 'Charlie'})
            .populate('friends')
            .exec(function(err, friends) {
                if (err) throw err
                console.log('JSON for friends is: ', friends);
                db.disconnect();

            });            

        });

    });

});