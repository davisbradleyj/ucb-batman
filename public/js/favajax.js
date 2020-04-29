sampleString = "7001635,7002742,7006663,7000108,7002175";


function favorites (string) {
    var queryURL = "https://www.trailrunproject.com/data/get-trails-by-id?ids=" + string + "&key=200738208-3eb3eaf9d881066a53bca93d0ea3b28e";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response)
    })
}