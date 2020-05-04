const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const userId = currentUser.id;
let favString = currentUser.favorites;
let trailObject = [];

function initMap() {
    favorites(favString);
}

function favorites(string) {
    var queryURL = "https://www.trailrunproject.com/data/get-trails-by-id?ids=" + string + "&key=200738208-3eb3eaf9d881066a53bca93d0ea3b28e";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        trailObject = response.trails;
        var centerOn = { lat: 37.7258, lng: -122.1569 };
        var map = new google.maps.Map(
            document.getElementById('map'), { zoom: 9, center: centerOn });

        for (i = 0; i < trailObject.length; i++) {
            $("#trails").append(`<div id="card" class="p-2">
                    <div class="card-body bg-light opacity">
                        <h5 class="card-title">${i + 1} - ${trailObject[i].name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${trailObject[i].location}</h6>
                        <p class="card-text">${trailObject[i].summary}</p>
                        <p class="card-text"><img src="${trailObject[i].imgSmall}"></p>
                        <h6 class="card-subtitle mb-2 text-muted">Length: ${trailObject[i].length} miles | Difficulty: ${trailObject[i].difficulty}</h6>
                    <button data-id="${i}" type="button" class="seeMap btn btn-primary">see a map</button>
                    <div class="form-group">
                    <label for="postReview">Review</label>
                    <textarea class="form-control" id="reviewText${i + 1}" placeholder="Write Review Here..."></textarea>
                    </div>
                    <button id="${i + 1}" type="submit" data-trailname="${trailObject[i].name}"  data-traillocation="${trailObject[i].location}" class="submitReview btn btn-primary">Submit</button>
                  </form>

                    </div>


                    </div>`);
            var centerOn = { lat: trailObject[i].latitude, lng: trailObject[i].longitude };
            // The marker, positioned at Uluru
            var marker = new google.maps.Marker({
                position: centerOn,
                label: `${i + 1}`,
                map: map
            });
        }
    });

    $(document).on("click", ".seeMap", function (event) {
        event.preventDefault();
        var trailID = $(this).attr("data-id");
        lat = trailObject[trailID].latitude;
        lng = trailObject[trailID].longitude;
        var centerOn = { lat: lat, lng: lng };
        // The map, centered at Uluru
        var map = new google.maps.Map(
            document.getElementById('map'), { zoom: 14, center: centerOn });
        var marker = new google.maps.Marker({
            position: centerOn, map: map
        });
    })
};

$(document).on("click", ".submitReview", function (event) {
    event.preventDefault();
    console.log("Submit clicked");
    var textID = "#reviewText" + $(this).attr("id");
    var reviewText = $(textID).val().trim();
    var trailName = $(this).attr("data-trailname");
    var trailLocation = $(this).attr("data-traillocation");
    var reviewTitle = "Review of " + trailName + " by: " + currentUser.username;

    var newReview = {
        userId: userId,
        reviewTitle: reviewTitle,
        reviewText: reviewText,
        user: currentUser.username,
        trailName: trailName,
        trailLocation: trailLocation
    }

    console.log(newReview)
    $.ajax("/api/new/review", {
        type: "POST",
        data: newReview
    }).then(function (result) {
        console.log("Inserted into Reviews");

    })
    location.reload();
})