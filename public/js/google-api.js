    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    
    function success(pos) {
      var crd = pos.coords;
    
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.getCurrentPosition(success, error, options);

    
    function initMap() {
      var lat = 37.7258;
      var lon = -122.1569;
      var maxDistance = 25;
      var trailObject = [];
      function buildQuery(lat, lon, maxDistance) {
          var queryURL = "https://www.trailrunproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=" + maxDistance + "&key=200741930-359c494378ff28115656bbb2fe7a58c7";
          $.ajax({
              url: queryURL,
              method: "GET"
          }).then(function(response){
              trailObject = response.trails;
              for (i = 0; i < trailObject.length; i++){

                $("#card").append(`<div class="card-body">
                <h5 class="card-title">${trailObject[i].name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${trailObject[i].location}</h6>
                <p class="card-text">${trailObject[i].summary}</p>
                <h6 class="card-subtitle mb-2 text-muted">${trailObject[i].length} | ${trailObject[i].difficulty}</h6>
                <button id="seeMap" data-id="${i}" type="button" class="btn btn-primary">see a map</button>
                <button id="myfav" data-id="${i}" type="button" class="btn btn-primary">add to favorites</button>
                </div>`)
              }
              console.log(trailObject);
              var g_long = trailObject[6].longitude;
              var g_lat = trailObject[6].latitude;
              // lat and long.
              var sanFrancisco = { lat: g_lat, lng: g_long };
              // The map, centered.
              var map = new google.maps.Map(document.getElementById("map"), {
                zoom: 8,
                center: sanFrancisco
              });
              // The marker, positioned.
              var marker = new google.maps.Marker({ position: sanFrancisco, map: map });
          })
      }
      buildQuery(lat, lon, maxDistance);
    }