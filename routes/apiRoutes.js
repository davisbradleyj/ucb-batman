const db = require("../models");
const path = require("path");

module.exports = function (app) {

    app.get("/", function (req, res) {
        console.log("At home page")
        res.sendFile(path.join(__dirname + "/../public/html/index.html"))
    })

    // Post a new user
    app.post("/api/newuser", function (req, res) {
        console.log("posting new user");

        db.User.create({
            username: req.body.username,
            password: req.body.password,
            hasReview: req.body.hasReview
        }).then(function (result) {
            console.log("Inserted into user table");
        }).catch(function (err) {
            console.log(err);
        })
    })

    app.get("/api/login/:username/:password", function (req, res) {

        db.User.findOne({
            where: {
                username: req.params.username,
                password: req.params.password
            }
        }).then(function (dbUser) {
            console.log(dbUser);
            res.json(dbUser);
        })
    })

    // Get Review page
    app.get("/:id", function (req, res) {
        console.log("Inside unique id");
        res.sendFile(path.join(__dirname, "/../public/html/review.html"));
    })

    // update user table
    app.put("/api/user/update/:id", function (req, res) {
        const id = req.params.id;
        console.log("Updating user table");
        console.log(id);

        db.User.update({
            hasBlog: 1
        }, {
            where: {
                id: id
            }
        }).then(function (result) {
            console.log("Updated user table");
            res.json(result);
        })
    })

    // View all reviews and users
    app.get("/api/view/reviews", function (req, res) {
        console.log("Viewing all reviews");

        db.Review.findAll({
        }).then(function (result) {
            res.send(result);
        })
    })

    
}