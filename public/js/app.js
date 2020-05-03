$(document).ready(function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")); 
    const userId = currentUser.id;
    var userName;
    var reviewContents;

    let queryURL = "/api/myreviews/" + userId;

    $.get(queryURL, function (res) {
        console.log(res);

        for(var i=0; i<res.length; i++){

        let trailLocation = "California";

        $("#trailReviews").append(`<div id="card" class="p-2">
        <div class="card-body bg-light opacity">
            <h5 class="card-title">${res[i].reviewTitle}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${trailLocation}</h6>
            <p class="card-text">${res[i].reviewText}</p>
            <a href="#" class="card-link">Add Comment</a>
        </div>`);
        }
    });

    $("#submitReview").on("click", function (event) {
        event.preventDefault();
        console.log("Submit clicked");
        var reviewTitle = $("#reviewTitle").val().trim();
        var reviewText = $("#reviewText").val().trim();

        var newReview = {
            userId: userId,
            reviewTitle: reviewTitle,
            reviewText: reviewText
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

    // Post a comment
    $(document).on("click", "#comment-btn", function(event) {
        event.preventDefault();
        let commentId = $(this).data("id");
        console.log(`comment ID ${commentId}`);
        let commentText = $("textarea[data-id=" + commentId + "]").val();
        let newComment = {
            commentText: commentText,
            userId: userId,
            reviewId: commentId
        }

        // Post to comments table
        $.ajax("/api/new/comment", {
            type: "POST",
            data: newComment
        }).then(function () {
            console.log("Posted to comment table");
        })
        // clear the text area
        $("textarea[data-id=" + commentId + "]").val("");
    })
})

