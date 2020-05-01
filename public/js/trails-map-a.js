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
        var centerOn = { lat: 37.7258, lng: -122.1569 };
        var map = new google.maps.Map(
            document.getElementById('map'), { zoom: 9, center: centerOn });
        for (i = 0; i < trailObject.length; i++) {
            $("#card").append(`<div class="card-body bg-light opacity">
                <h5 class="card-title">${trailObject[i].name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${trailObject[i].location}</h6>
                <p class="card-text">${trailObject[i].summary}</p>
                <h6 class="card-subtitle mb-2 text-muted">${trailObject[i].length} | ${trailObject[i].difficulty}</h6>
                <button data-id="${i}" type="button" class="seeMap btn btn-primary">see a map</button>
                <button data-id="${i}" type="button" class="addFav btn btn-primary">add to favorites</button>
                </div>
                <br>`);
            var centerOn = { lat: trailObject[i].latitude, lng: trailObject[i].longitude };
            // The marker, positioned at Uluru
            var marker = new google.maps.Marker({ position: centerOn, map: map });
        }

        $(document).on("click", ".seeMap", function (event) {
            event.preventDefault();
            var trailID = $(this).attr("data-id");
            lat = trailObject[trailID].latitude;
            lng = trailObject[trailID].longitude;
            var centerOn = { lat: lat, lng: lng };
            // The map, centered at Uluru
            var map = new google.maps.Map(
                document.getElementById('map'), { zoom: 14, center: centerOn });
            var marker = new google.maps.Marker({ position: centerOn, map: map });
        })

        $(document).on("click", ".addFav", function (event) {
            event.preventDefault();
            var trailID = $(this).attr("data-id");
            newFav = trailObject[trailID].id;
            console.log(newFav);
        })
    });
}

function getLocal() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    function success(pos) {
        var crd = pos.coords;
        console.log(lat);
        console.log(lon);
        lat = crd.latitude;
        lon = crd.longitude;
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
    }
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
}