$(function () {
    $(".card-link").on("click", function (event) {
        var id = $(this).data("newItem")
        console.log($(this));
    })
})

favString = "7001635,7002742,7006663";
sampleLat = "37.7749";
sampleLong = "-122.4194";
sampleDist = 20;

function favorites(string) {
    var queryURL = "https://www.trailrunproject.com/data/get-trails-by-id?ids=" + string + "&key=200738208-3eb3eaf9d881066a53bca93d0ea3b28e";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        const trails = response.trails;
        for(var i=0; i<trails.length; i++) {
            const thisTitle = "#trailTitle" + (i+1);
            const thisInfo = "#trailInfo" + (i+1);
            const thisImage = "#trailImage" + (i+1);
            const thisLocation = "#trailLocation" + (i+1);
            const thisDiff = "#trailDiff" + (i+1);
            const thisLength = "#trailLength" + (i+1);

            $(thisTitle).text(trails[i].name);
            $(thisImage).attr("src", response.trails[i].imgSmall)
            $(thisLocation).text(trails[i].location);
            $(thisInfo).text(trails[i].summary);
            $(thisDiff).text("Difficulty: " + trails[i].difficulty);
            $(thisLength).text("Length: " + trails[i].length + " miles");
        }
    })
};

favorites(favString);