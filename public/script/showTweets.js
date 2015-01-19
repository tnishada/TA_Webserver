
var webpageURL =  window.location.href;

var httpGet = function(theUrl , params) {
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl+"?"+params, false );
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
};

var readAll = function() {
    var obj = httpGet(webpageURL+"all",null);
	drawGraph(obj);
};

var getPositiveTenTweets = function(){
	var obj = httpGet(webpageURL+"mostrecentpositive",null);
	drawGraph(obj)
};

var getNegativeTenTweets = function(){
	var obj = httpGet(webpageURL+"mostrecentnegative",null);
	drawGraph(obj);
};

var getTimeFilteredTweets = function(){

	var toDate = document.getElementById('toDate').value;
	var fromDate = document.getElementById('fromDate').value;

	if(toDate == "" || fromDate == "" ){
		alert("please fill all fields to continue");
	}
	else{
		var fromTimestamp = getStandardTime(fromDate);
		var toTimestamp = getStandardTime(toDate);

		var obj = httpGet(webpageURL+"timefilteredtweets","from="+fromTimestamp+"&to="+toTimestamp);
		drawGraph(obj);
	}
};

var drawGraph = function(jsonObj){
	var data = [];
	for(var i =0 ; i < jsonObj.length ; i++)	{
		var obj = {'date':jsonObj[i]["tweet_json"]["created_at"],'close':jsonObj[i]['sentiment_json']['compound']};
		data[i] = obj;
	}
	drawer(null,data);
};

var getStandardTime = function(dateString ){
	var dateObj = new Date(dateString);
	return objectIdFromDate(dateObj);
};

var objectIdFromDate = function (date) {
	return Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000";

};

