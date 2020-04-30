module.exports = function(req, res, next) {
    // approved login
    if (req.user) {
      return next();
    }
    // redirect if not logged in
    console.log(req.user);
    // It's probably not working because of this.
    console.log("redirecting....not logged in");
    return res.redirect("./login");
  };
  