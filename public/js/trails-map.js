function initMap() {
  var lat = 37.7258;
  var lon = -122.1569;
  var maxDistance = 25;
  var trailObject = [];

  var queryURL = "https://www.trailrunproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=" + maxDistance + "&key=200741930-359c494378ff28115656bbb2fe7a58c7";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    trailObject = response.trails;
    // The location for map center
    var centerOn = {lat: 37.7258, lng: -122.1569};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 9, center: centerOn});
    for (i = 0; i < trailObject.length; i++) {
      $("#card").append(`<div class="card-body">
                <h5 class="card-title">${trailObject[i].name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${trailObject[i].location}</h6>
                <p class="card-text">${trailObject[i].summary}</p>
                <h6 class="card-subtitle mb-2 text-muted">${trailObject[i].length} | ${trailObject[i].difficulty}</h6>
                <button id="seeMap" data-id="${i}" type="button" class="btn btn-primary">see a map</button>
                <button id="myfav" data-id="${i}" type="button" class="btn btn-primary">add to favorites</button>
                </div>`);      
      var centerOn = {lat: trailObject[i].latitude, lng: trailObject[i].longitude};
      // The marker, positioned at Uluru
      var marker = new google.maps.Marker({position: centerOn, map: map});
    }
  });
}