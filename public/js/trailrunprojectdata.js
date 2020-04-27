//US CENSUS DATA
var unirest = require("unirest");

var req = unirest("GET", "https://eec19846-geocoder-us-census-bureau-v1.p.rapidapi.com/locations/onelineaddress");

req.query({
	"format": "json",
	"address": "1 Embarcadero street San Francisco",
	"benchmark": "Public_AR_Current"
});

req.headers({
	"x-rapidapi-host": "eec19846-geocoder-us-census-bureau-v1.p.rapidapi.com",
	"x-rapidapi-key": "e00431f19fmshdb1dcf01d2cc529p1acb6djsnb2fd2c425430"
});

req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});


//TRAIL RUN PROJECT DATA
var lat;
var lon;
var maxDistance /* In miles */;

function buildQuery() {
    var queryURL = "https://www.trailrunproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=" + maxDistance + "&key=200740055-1a1f304cd723210b34647df834395b32"
}