//TRAIL RUN PROJECT DATA
var lat = 37.734791;
var lon = -122.149529;
var maxDistance = 1000;

function buildQuery(lat, lon, maxDistance) {
    var queryURL = "https://www.trailrunproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=" + maxDistance + "&key=200741930-359c494378ff28115656bbb2fe7a58c7";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        let trailObject = response.trails;
        console.log(trailObject);
    })
}
buildQuery(lat, lon, maxDistance);