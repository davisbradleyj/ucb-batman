$(document).ready(function () {
    var userId = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
    var userName;
    var reviewContents;

    $("#submit-btn").on("click", function (event) {
        event.preventDefault();
        console.log("Submit clicked");
        var reviewTitle = $("#postTitle").val().trim();
        var reviewText = $("#postReview").val().trim();

        var newReview = {
            userId: userId,
            reviewTitle: reviewTitle,
            reviewText: reviewText
        }

        $.ajax("/api/new/reviews", {
            type: "POST",
            data: newReview
        }).then(function (result) {
            console.log("Inserted into Reviews");

            $.ajax("/api/user/update/" + userId, {
                type: "PUT"
            }).then(function () {
                console.log("Updated value to user table")
            })
        })
        location.reload;
    })
})