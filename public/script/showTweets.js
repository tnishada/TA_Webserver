function httpGet(theUrl)
{
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
}

function readAll()
{
    var obj = httpGet("http://localhost:3000/all");
    // document.getElementbyid("viewer").innerText = obj.toString();
    var content = "";
	
	content += "<table> <tr><th>#</th><th>Tweets</th><th>+ Sentiment</th></tr>";
    for(var i =0 ; i < obj.length ; i++)
    {
		content += "<tr><td>";
		content += (i+1).toString();
		
		content += "</td><td>";
        content = content + obj[i]["tweet_json"]["text"];
		
		content+= "</td><td>";
		content+= obj[i]['sentiment_json']['compound'];	
		
		
		content += "</td></tr>";
    }
	
	content += "</table>";
	
    document.getElementById("viewer").innerHTML = content;
	drawGraph(obj);
}

function getPositiveTenTweets()
{
	var obj = httpGet("http://localhost:3000/mostrecentpositive");
	  var content = "";
	
	content += "<table> <tr><th>#</th><th>Tweets</th><th>+ Sentiment</th></tr>";
    for(var i =0 ; i < obj.length ; i++)
    {
		content += "<tr><td>";
		content += (i+1).toString();
		
		content+= "</td><td>";
        content = content + obj[i]["tweet_json"]["text"];
		
		content+= "</td><td>";
		content+= obj[i]['sentiment_json']['compound'];
		
		content += "</td></tr>";

    }
	
	content += "</table>";
	
    document.getElementById("viewer").innerHTML = content;
	drawGraph(obj)
}


function getNegativeTenTweets()
{
	var obj = httpGet("http://localhost:3000/mostrecentnegative");
	  var content = "";
	
	content += "<table> <tr><th>#</th><th>Tweets</th><th>+ Sentiment</th></tr>";
    for(var i =0 ; i < obj.length ; i++)
    {
		content += "<tr><td>";
		content += (i+1).toString();
		
		content += "</td><td>";
        content = content + obj[i]["tweet_json"]["text"];
		
		content+= "</td><td>";
		content+= obj[i]['sentiment_json']['compound'];	
		
		
		content += "</td></tr>";

    }
	
	content += "</table>";
	
    document.getElementById("viewer").innerHTML = content;
	drawGraph(obj);
}

var drawGraph = function(jsonObj) {

	var data = [];
	for(var i =0 ; i < jsonObj.length ; i++)
	{
		var obj = {'date':jsonObj[i]["tweet_json"]["created_at"],'close':jsonObj[i]['sentiment_json']['compound']};

		data[i] = obj;
	}
	drawer(null,data);
};

