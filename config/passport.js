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

passport.serializeUser(function(user, cb) {
  cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
module.exports = passport;
