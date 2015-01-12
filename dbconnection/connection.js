var mongoose = require('mongoose');
mongoose.connect('mongodb://nishada:110330V@ds031271.mongolab.com:31271/twittersentiment');

var db = mongoose.connection;
//detect connection errors
db.on('error',console.error.bind(console,'connection error:'));

var tweetschema = new mongoose.Schema({
	tweet_json : Object
	, sentiment_json : Object
	, saved_time : Object
}); 
	
var tweet = mongoose.model('tweets', tweetschema);

db.once('open',function (callback){
	console.log('connected');
});

var getConnection = function(){		
	return tweet;
};

module.exports.getConnection = getConnection;