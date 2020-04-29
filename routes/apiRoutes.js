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
            hasReview: 1
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

    // Get the username of the poster
    app.get("/api/user/username", function (req, res) {
        console.log("Inside get user name function");

        db.Review.findAll({
            include: [{
                model: db.User,
                attributes: ['userName'],
                where: {
                    userId: db.Sequelize.col('User.id')
                }
            }],

        }).then(function (result) {
            console.log(result);
            res.json(result);
        }).catch(function (err) {
            console.log(err);
        })
    })

    // To get the username who commented
    app.get("/api/comment/username/:id/:comment", function (req, res) {

        db.User.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (dbUser) {
            console.log(dbUser);
            const result = {
                dbUser: dbUser,
                comment: req.params.comment
            }
            res.json(result);
        })
    })

    // To look at your own reviews
    app.get("/api/myreviews/:id", function (req, res) {
        console.log("Inside myreviews function");

        db.Review.findAll({
            where: {
                UserId: req.params.id
            }
        }).then(function (myReview) {
            res.json(myReview);
        })
    })

    // post a comment on a review
    app.post("/api/new/comment", function (req,res) {
        db.Comment.create({
            id: req.body.id,
            comment: req.body.comment,
            userId: req.body.userId,
            ReviewId: req.body.reviewId
        }).then(function (result) {
            console.log("Inserted into Comments table");
            res.json(result);
        }).catch(function (err) {
            console.log(err);
        })
    })

    // retrieve commments for specific review
    app.get("/api/comment/:reviewId", function (req, res) {

        db.Comment.findAll({
            where: {
                ReviewId: req.params.reviewId
            }
        }).then(function (comment) {
            res.json(comment);
        })
    })

    // delete a review
    app.put("/api/review/delete/:id", function (req, res) {
        const id = req.params.id;

        db.Review.destroy({
            where: {
                id: id
            }
        }).then(function (result) {
            res.json(result);
        })
    })

    // delete a comment
    app.put("/api/comment/delete/:id", function (req, res) {
        const id = req.params.id;

        db.Comment.destroy({
            where: {
                id: id
            }
        }).then(function (result) {
            res.json(result);
        })
    })

    // update a review
    app.put("/api/review/update/:id", function (req,res) {
        const id = req.arams.id;

        db.Review.update({
            reviewText: req.body.contents
        },
        {
            where: {
                id: id
            }
        }).then(function () {
            console.log("Updated review table");
            res.json("Updated");
        })
    })
}