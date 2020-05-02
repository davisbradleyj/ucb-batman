$(document).ready(function () {
    var userId = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
    var userName;
    var reviewContents;

    $("#submitReview").on("click", function (event) {
        event.preventDefault();
        console.log("Submit clicked");
        var reviewTitle = $("#reviewTitle").val().trim();
        var reviewText = $("#reviewText").val().trim();

        var newReview = {
            userId: 1,
            reviewTitle: reviewTitle,
            reviewText: reviewText
        }

        console.log(newReview)
        $.ajax("/api/new/review", {
            type: "POST",
            data: newReview
        }).then(function (result) {
            console.log("Inserted into Reviews");

            $.ajax("/api/user/update/" + 1, {
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

