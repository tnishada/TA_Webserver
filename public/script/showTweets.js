var httpGet = function(theUrl , params) {
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl+"?"+params, false );
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
};

var readAll = function() {
    var obj = httpGet("http://localhost:3000/all",null);
	drawGraph(obj);
};

var getPositiveTenTweets = function(){
	var obj = httpGet("http://localhost:3000/mostrecentpositive",null);
	drawGraph(obj)
};

var getNegativeTenTweets = function(){
	var obj = httpGet("http://localhost:3000/mostrecentnegative",null);
	drawGraph(obj);
};

var getTimeFilteredTweets = function(){
	var toDate = document.getElementById('toDate').value;
	var toTime = document.getElementById('toTime').value;
	var fromDate = document.getElementById('fromDate').value;
	var fromTime = document.getElementById('fromTime').value;


	if(toDate == "" || toTime == "" || fromDate == "" || fromTime == ""){
		alert("please fill all fields to continue");
	}
	else{
		var fromTimestamp = getStandardTime(fromDate,fromTime);
		var toTimestamp = getStandardTime(toDate,toTime);

		var obj = httpGet("http://localhost:3000/timefilteredtweets","from="+fromTimestamp+"&to="+toTimestamp);
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

var getStandardTime = function(date , time){

	var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
	var months = ['Jan','Feb','Mar','May','June','July','Aug','Sept','Oct','Nov','Dec'];

	var date = new Date(date);

	var sDay = days[date.getDay()];
	var sMonth = months[date.getMonth()];
	var sYear = date.getFullYear();

	var standardTime = sDay+" "+sMonth+" "+date.getDate()+" "+time+":00 %2B0000 "+sYear;
	return standardTime;
};

