const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const userId = currentUser.id;
let queryURL = "/api/view/reviews";

$.get(queryURL, function (res) {
    console.log(res);

    for (var i = 0; i < res.length; i++) {
        $("#allReviews").append(`<div id="card" class="p-2">
    <div class="card-body bg-light opacity">
        <h5 class="card-title">${res[i].reviewTitle}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${res[i].trailLocation}</h6>
        <p class="card-text">${res[i].reviewText}</p>        
        <div class="form-group">
        <label for="comment-text">New Comment</label>
        <textarea class="form-control" data-id="${res[i].id}" placeholder="Write a comment ..."></textarea>
        </div>
        <button data-comment-id="${res[i].id}" class="comment-btn btn btn-primary">Add Comment</button>
        <button id="${res[i].id}" class="deleteReview btn btn-danger">Delete Review</button>

    </div>`);
    }
});

// Post a comment
$(document).on("click", ".comment-btn", function (event) {
    event.preventDefault();
    let reviewId = $(this).attr("data-comment-id");
    console.log(`comment ID ${reviewId}`);
    let commentText = $("textarea[data-id=" + reviewId + "]").val();
    let newComment = {
        commentText: commentText,
        userId: userId,
        reviewId: reviewId,
        user: currentUser.username
    }
    // Post to comments table
    $.ajax("/api/new/comment", {
        type: "POST",
        data: newComment
    }).then(function () {
        console.log("Posted to comment table");
    })
    // clear the text area
    $("textarea[data-id=" + reviewId + "]").val("");
});

$(document).on("click", ".deleteReview", function (event) {
    event.preventDefault();
    console.log("deleteReview");
    var id = $(this).attr("id");
    var deleteReview = {
        id: id
    }
    console.log(deleteReview)
    var deleteQuery = "/api/review/delete/" + id;
    $.ajax(deleteQuery, {
        type: "PUT",
        data: deleteReview
    }).then(function (result) {
        console.log("Review Deleted");
        location.reload();
    })
})