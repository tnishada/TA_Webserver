var express = require('express')
var app = express()

//mongoosejs. this is to be inseted to a seperate file later
var mongoose = require('mongoose');
mongoose.connect('mongodb://nishada:110330V@ds031271.mongolab.com:31271/twittersentiment');
var db = mongoose.connection;
//detect connection errors
var db = mongoose.connection;
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

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendfile('./public/html/index.html');
})

app.get('/all', function (req, res) {
	//////////
	
	
	tweet.find({}, function(err, data){
		res.json(data);
	})
	///////////
  
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('twitter analyser is  listening at http://%s:%s', host, port)

})