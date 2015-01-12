var express = require('express');
var app = express();
var con = require('./dbconnection/connection.js'); // obtain the connection

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendfile('./public/html/index.html');
})

// request for all the tweets 
app.get('/all', function (req, res) {
	con.getConnection().find({}, function(err, data) 
	{	
		if(err != null)
		{
			console.log("error occurred while retrieving data from the database");
		}
		res.json(data);
	})
})

//request to get the most recent 10 positive tweets
app.get('/mostpositive', function(req , res) {
	var query = con.getConnection().find({});
	query.sort({'_id':-1});
	query.where("sentiment_json.compound").gt(0);
	query.limit(10);
	query.exec(function(err, data){
		res.json(data);
	})
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('twitter analyser is  listening at http://%s:%s', host, port);
})