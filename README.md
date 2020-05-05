# B.A.T.M.a.N.

[<img src="https://img.shields.io/badge/License-MIT-blue.svg">](https://opensource.org/licenses/MIT) [<img src="https://img.shields.io/badge/_ES_-_6_-green.svg">](https://tc39.es/ecma262/) [<img src=https://img.shields.io/badge/_JavaScript_-_ECMA6_-green.svg>](https://developer.mozilla.org/en-US/docs/Web/JavaScript) [<img src=https://img.shields.io/badge/_MySQL_-2.18.1_-orange.svg>](https://www.npmjs.com/package/mysql) [<img src=https://img.shields.io/badge/_Express_-_4.16.4-pink.svg>](https://www.npmjs.com/package/fs-extra)

## Description

BATMaN is a community hub and a toolset for outdoor enthusiast to find new trails, new communities and new adventures in the Bay Area.  Pick a trail, find community, get outside!

## Table of Contents

  * [Technology](#Technology)

  * [Summary](#Summary)

  * [Learning-Points](#Learning-Points)
  
  * [License](#License)
  
  * [Contributing](#Contributing)
  
  * [Installation](#Installation)
  
  * [Tests](#Tests)
  
  * [Questions](#Questions)

## Technologies Used
- HTML - used to create elements on the DOM
- CSS - used to add style to the deployed page
- JavaScript - used to create the logic controlling the client-side application
- jQuery - library supplement to JavaScript controlling application logic
- Node.js - runtime environment which executes the JS code
- Express - framework for Node.js to create a server
- Passport - middleware layer which supports authentication strategies
- Unirest - lightweight HTTP request library used to implify requests for APIs
- MySQL Workbench - database used for storing and calling information on commandline application
- Git - version control system to track changes to source code
- GitHub - hosts repository that can be deployed to GitHub Pages
- Heroku - host for deployed application

## Summary

In an age of social distancing, we all look forward to a time when being outside and gathering in groups is the usual normal.  To that end, our team sought to create an application targeting outdoor enthusiasts, and allowing them to review nearby hiking trails, read reviews on those trails, choose their favorites, and comment on the reviews of others.

In order to access the information on the site, a user must create a session through a login to the site, with this authentication controlled by Passport.js. Passport collects the username and password, compares it to the information stored in our user database, with an authenticated user then able to access the applcation.  The logic controlling these actions is available in the passport.js file, authenticated.js file, and apiRoutes.js, with most of the requirements declared in the server.js.  Below are snippets of the logic from passport, authenticated, and apiRoutes:

`Passport.js`
```
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");
// LocalStrategy will use a login with a username and password
passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(username, password);
    db.User.findOne({
      where: {
        username: username,
        password: password
      }
    }).then(function(dbUser) {
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect username or password."
        });
      }
      return done(null, dbUser);
    });
  }
));
```

`Authenticated.js`
```
module.exports = function(req, res, next) {
    // approved login
    if (req.user) {      
      return next();

    }
    // redirect if not logged in
    console.log("redirecting...not logged in")
    console.log(req.user)
    return res.redirect("./login");
  };
```

`apiRoutes.js`
```
   app.get("/login", function(req, res) {
        // If the user already has an account send them to the mytrails page
        if (req.user) { 
            console.log("redirect to mytrails")
            res.redirect("/mytrails"); 
        } else {
            console.log("not logged in")
            res.sendFile("/html/login.html", {root: path.join(__dirname,  "../public") 
            });
        };
    });
    app.get("/trails", authenticated, function(req, res) {
        // if authenticated, allow access to trails page
        res.sendFile("/html/trails.html", {root: path.join(__dirname,  "../public") });
    });
    app.get("/mytrails", authenticated, function(req, res) {
        // if authenticated, allow access to mytrails page        
        res.sendFile("/html/mytrails.html", {root: path.join(__dirname,  "../public") });
    });
```

One of the more creative features that we coded was the ability for a user to view comments on the reviews of others through the community page.  This feature utilizes get routes from our comments and reviews pages, merges them through a series of promises to allow a series of string literals to be written dynamically to our html pages.  The initial loop pulls in all the reviews in order by id, and prints them to the page.  Prior to moving to the next review, a request is made to pull in all the comments for that review, with each generated through a secondary loop, then rendered into the string literal to create the fully displayed review card.

`apiRoutes.js`
```
app.get("/api/view/reviews", function (req, res) {
  console.log("Viewing all reviews");
  db.Review.findAll({
  }).then(function (result) {
      res.json(result);
  })
})

app.get("/api/comment", function (req, res) {
  db.Comment.findAll({
  }).then(function (comment) {
      res.json(comment);
  })
})
```

`community.js`
```
$.get(queryURL, function (res) {
    for (var i = 0; i < res.length; i++) {
        ReviewID = res[i].id;
        ReviewArr.push(ReviewID);
        console.log(ReviewID);
        console.log("...")
        $("#allReviews").append(
            `<div id="card" class="p-2">
            <div class="card-body bg-light opacity">
                <h5 class="card-title">${res[i].reviewTitle}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${res[i].trailLocation}</h6>
                <p class="card-text">${res[i].reviewText}</p>        
            <div class="form-group">
                <label for="comment-text">New Comment</label>
                <textarea class="form-control" data-id="${ReviewID}" placeholder="Write a comment ..."></textarea>
            </div>
            <div>
                <button data-comment-id="${ReviewID}" class="comment-btn btn btn-primary">Add Comment</button>
                <button id="${ReviewID}" class="deleteReview btn btn-danger">Delete Review</button>
            </div>
            <div id = "comment${ReviewID}"></div>
        </div>`
        );
    };
}).then(function (data) {
    console.log(ReviewArr);
    let commentQuery = "/api/comment";
    $.get(commentQuery, function (commentRes) {
        commentArray = commentRes;
    }).then(function () {
        for (let j = 0; j < commentArray.length; j++) {
            $(`#comment${commentArray[j].ReviewId}`).append(`<div class="card-body bg-light opacity"><h6>${commentArray[j].user} commented:</h6><p>${commentArray[j].commentText}</p></div>`);
        }
    })
})
```
<img src="https://github.com/davisbradleyj/ucb-batman/blob/master/public/images/batman_readme.gif">

## Learning-Points

As this was the first time working as a team, most of ou key learning points related to how to co-exist in a team.  Our strengths included:
- Communicating changes to code, and working together to ensure updates get into the code
- Setting reasonable expectations for goals
- Pivoting quickly with good pacing of development/programming worknot losing time
- Distribution of work / Willingness to pair program and assist when teammates are stuck

With regards to the technology learning points, we put into practice our ability to research and implement data from RapidAPI and the TrailRunProject Data API, and using Google Maps to help represent some of this returned data.  This was also a learning experience for each of our team in the practical application of Passport.js to control authentication and access to secure areas of our application. 

## Contributing

Jerome Chenette, Kerwin Hy, Mahi Gunasekaran, Stephon Autery, Dan Fellows, Sam Poppe, Brad Davis

## Installation

To install necessary dependencies for this application, the following commands are required:

`npm init` - To create the package.json file.

`npm i express mysql2 sequelize passport passport-local unirest` - Adds node modules and populates the package-lock.json file.

For those who wish to clone or fork this repo, the following steps should be followed:

Clone:
1) On GitHub, navigate to the main page of the repository.
2) Under the repository name, click Clone or download.
3) To clone the repository using HTTPS, under "Clone with HTTPS", click the clipboard icon. To clone the repository using an SSH key, including a certificate issued by your organization's SSH certificate authority, click Use SSH, then click the clipboard icon.
4) Open your local Terminal
5) Move into the directory location where you would like the cloned repo to sit.
6) Type `git clone` then paste the URL copied from earlier so that your would see the following - `$ git clone https://github.com/davisbradleyj/ucb-batman.git`
7) Press enter

Fork:
1) On GitHub, navigate to the main page of the repository.
2) In the top-right corner of the page, click Fork.

For more detailed instructions, you can visit GitHub directly to <a herf="https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository">Clone</a> or <a herf="https://help.github.com/en/github/getting-started-with-github/fork-a-repo">Fork</a>

## Tests

No tests were required for this application

## Questions

If you have any questions about the repository, open an issue or contact:

<img src="https://avatars1.githubusercontent.com/u/57854409?v=4" alt="avatar" style="border-radius: 16px" width="30">

[Stephon Autrey](https://github.com/stephonautery) directly at stephon@stephonautery.com

<img src="https://avatars2.githubusercontent.com/u/57814329?v=4" alt="avatar" style="border-radius: 16px" width="30">

[Dan Fellows](https://github.com/dfel08) directly at dfellows68@gmail.com

<img src="https://avatars3.githubusercontent.com/u/60407759?v=4" alt="avatar" style="border-radius: 16px" width="30">

[Sam Poppe](https://github.com/popsizzle) directly at poppe.samuel@gmail.com

<img src="https://avatars3.githubusercontent.com/u/61176147?v=4" alt="avatar" style="border-radius: 16px" width="30">

[Brad Davis](https://github.com/davisbradleyj) directly at davis.bradleyj@gmail.com

 

 

 

 