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

