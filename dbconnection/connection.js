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
	query.sort({'tweet_json.created_at':1});

	query.exec( function(err, data) {
		if(err != null)
		{
			console.log("error occurred while retrieving data from the database");

		}	/*
		for(var x=0 ; x<data.length ; x++)
		{
			console.log(data[x]['tweet_json']['created_at']);
		}	*/
		cb(err, data)
	})
};

var getMostRecentPositive = function(cb){
	var query = tweet.find({});
	query.sort({'tweet_json.created_at':-1});
	query.where("sentiment_json.compound").gt(0);
	query.limit(10);
	
	query.exec(function(err, data){
		cb(err, data);
	})
};

var getMostRecentNegative = function(cb){
	var query = tweet.find({});
	query.sort({'tweet_json.created_at':-1});
	query.where("sentiment_json.compound").lt(0);
	query.limit(10);
	
	query.exec(function(err, data){
		cb(err, data);
	})
};

var getTimeFilteredTweets = function(paramFrom , paramTo , cb){
	var query = tweet.find({});
	query.sort({'tweet_json.created_at':1});
	query.where("tweet_json.created_at").gt(paramFrom);
	query.where("tweet_json.created_at").lt(paramTo);

	query.exec(function(err, data){

		for(var x=0;x<data.length;x++)
		{
			console.log(data[x]['tweet_json']['created_at']);
		}
		cb(err, data);
	});
};




module.exports.getTimeFilteredTweets = getTimeFilteredTweets;
module.exports.getConnection = getConnection;
module.exports.getAll = getAll;
module.exports.getMostRecentPositive = getMostRecentPositive;
module.exports.getMostRecentNegative = getMostRecentNegative;