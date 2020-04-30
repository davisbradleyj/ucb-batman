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
  