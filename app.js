var express = require('express');
var app = express();
var con = require('./dbconnection/connection.js'); // obtain the connection

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendfile('./public/html/index.html');
})

app.get('/all', function (req, res) {
	con.getConnection().find({}, function(err, data) 
	{	
	  res.json(data);
	})
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('twitter analyser is  listening at http://%s:%s', host, port);
})