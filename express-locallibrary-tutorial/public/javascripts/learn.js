//uncomment if commented
// npm install express-generator
// express app-name --view=pug
//SET DEBUG=express-locallibrary-tutorial:* & npm run devStart
//dburi mongodb+srv://user:User@123@first-nycgh.mongodb.net/test?retryWrites=true
//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://user:User@123@first-nycgh.mongodb.net/test?retryWrites=true';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection, db is Connection instance, on conn 'open' event is triggered
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



// Define schema
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
    a_string: String,
    a_date: Date
});

// Compile model from schema, param 1 colectionname, 2 fields
var SomeModel = mongoose.model('SomeModel', SomeModelSchema);

//types
var schema = new Schema(
    {
        name: String,
        binary: Buffer,
        living: Boolean,
        updated: { type: Date, default: Date.now() },
        age: { type: Number, min: 18, max: 65, required: true },
        mixed: Schema.Types.Mixed,
        _someId: Schema.Types.ObjectId,
        array: [],
        ofString: [String], // You can also have an array of each of the other types too.
        nested: { stuff: { type: String, lowercase: true, trim: true } }
    })



//VALIDATION!!!!!!!
var breakfastSchema = new Schema({
    eggs: {
        type: Number,
        min: [6, 'Too few eggs'],
        max: 12,
        required: [true, 'Why no eggs?']
    },
    drink: {
        type: String,
        enum: ['Coffee', 'Tea', 'Water',],
        maxlength: 50
    }
});



var bModel = mongoose.model('bModel', breakfastSchema);
//create based on above model, models represent collections docs
//def ana save
bModel.create({ eggs: 7, drink: 'Tea' }, (err, res) => {
    if (err) {
        return handleError(err);
    }
});

//or
var x = new bModel({ eggs: 7, drink: 'Tea' });
x.save((err, res) => { });

//querying
// find all match param 1 / use regex, return eggs field, callback
bModel.find({ 'drink': 'Tea' }, 'eggs', function (err, breaks) {
    if (err) return handleError(err);
    // 'breaks' contains the list of breaks that match the criteria.
})

//without callback
let query = bModel.find({ 'drink': 'Tea' });

query.select('eggs');
query.limit(5);
query.sort({ eggs: -1 });
query.exec(function (err, breaks) {
    if (err) return handleError(err);
    // breaks contains an ordered list of 5 breaks which contain drink Tea
});

//or
bModel.
    find().
    where('drink').equals('Tea').
    where('eggs').gt(7).lt(10).  //Additional where query
    limit(5).
    sort({ eggs: -1 }).
    select('eggs').
    exec((err, res) => { });

//when referencing ids, use populate for actual data

//models
var mongoose = require('mongoose')
    , Schema = mongoose.Schema

var authorSchema = Schema({
    name: String,
    stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Author' },
    title: String
});

var Story = mongoose.model('Story', storySchema);
var Author = mongoose.model('Author', authorSchema);

//saving
var bob = new Author({ name: 'Bob Smith' });

bob.save(function (err) {
    if (err) return handleError(err);

    //Bob now exists, so lets create a story
    var story = new Story({
        title: "Bob goes sledding",
        author: bob._id    // assign the _id from the our author Bob. This ID is created by default!
    });

    story.save(function (err) {
        if (err) return handleError(err);
        // Bob now has his story
    });
});

//querying
Story
    .findOne({ title: 'Bob goes sledding' })
    .populate('author') //This populates the author id with actual author information!
    .exec(function (err, story) {
        if (err) return handleError(err);
        console.log('The author is %s', story.author.name);
        // prints "The author is Bob Smith"
    });

//options params path, select, model?, match, options
Story.find().populate('author', 'name', null, null, { sort: { name: -1 } }).exec(function (err, stories) {
    console.log(stories) // Zoopa
})



//router verbs: post(), put(), delete(), options(), trace(), copy(), lock(),
//  mkcol(), move(), purge(), propfind(), proppatch(), unlock(), report(), mkactivity(),
//   checkout(), merge(), m-search(), notify(), subscribe(), unsubscribe(), patch(),
//    search(), connect().