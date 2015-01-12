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
	
	content += "<table> <tr><th>Tweets</th><th>+ Sentiment</th></tr>";
    for(var i =0 ; i < obj.length ; i++)
    {
		content += "<tr><td>";
        content = content + obj[i]["tweet_json"]["text"];
		
		content+= "</td><td>";
		content+= obj[i]['sentiment_json']['compound'];	
		
		
		content += "</td></tr>";
    }
	
	content += "</table>";
	
    document.getElementById("viewer").innerHTML = content;
}

function getPositiveTenTweets()
{
	var obj = httpGet("http://localhost:3000/mostpositive");
	  var content = "";
	
	content += "<table> <tr><th>Tweets</th><th>+ Sentiment</th></tr>";
    for(var i =0 ; i < obj.length ; i++)
    {
		content += "<tr><td>";
        content = content + obj[i]["tweet_json"]["text"];
		
		content+= "</td><td>";
		content+= obj[i]['sentiment_json']['compound'];	
		
		
		content += "</td></tr>";
    }
	
	content += "</table>";
	
    document.getElementById("viewer").innerHTML = content;
}