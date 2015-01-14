var express = require('express');
var app = express();
var con = require('./dbconnection/connection.js'); // obtain the connection

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendfile('./public/html/index.html');
})

// request for all the tweets 
app.get('/all', function (req, res) {
	con.getAll(function(err, data) {
		res.json(data);
	});	
})

//request to get the most recent 10 positive tweets
app.get('/mostrecentpositive', function(req , res) {
	console.log("request for positive tweets received");
	con.getMostRecentPositive(function(err, data){
		res.json(data);
	});	
})

app.get('/mostrecentnegative', function(req , res){
	console.log("request for negative tweets received");
	con.getMostRecentNegative(function(err , data){
		res.json(data);
	});
});

app.get('/timefilteredtweets',function(req, res){

	con.getTimeFilteredTweets(req['query']['from'],req['query']['to'] , function(err , data){
		//console.log(data);
		res.json(data);
	});
});


var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('twitter analyser is  listening at http://%s:%s', host, port);
})