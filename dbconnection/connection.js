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

var getAll = function(cb){
	
	var query = tweet.find({});
	query.sort({'_id':-1});

	query.exec( function(err, data) {
		if(err != null)
		{
			console.log("error occurred while retrieving data from the database");
		}
		cb(err, data)
	})	
};

var getMostRecentPositive = function(cb){
	var query = tweet.find({});
	query.sort({'_id':-1});
	query.where("sentiment_json.compound").gt(0);
	query.limit(10);
	
	query.exec(function(err, data){
		cb(err, data);
	})
};

var getMostRecentNegative = function(cb){
	var query = tweet.find({});
	query.sort({'_id':-1});
	query.where("sentiment_json.compound").lt(0);
	query.limit(10);
	
	query.exec(function(err, data){
		cb(err, data);
	})
};

module.exports.getConnection = getConnection;
module.exports.getAll = getAll;
module.exports.getMostRecentPositive = getMostRecentPositive;
module.exports.getMostRecentNegative = getMostRecentNegative;