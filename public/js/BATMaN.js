$(function () {
    $(".card-link").on("click", function (event) {
        var id = $(this).data("newItem")
        console.log($(this));
    })
})