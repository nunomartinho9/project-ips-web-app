function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash("error_msg", "Acesso negado!");
    res.redirect("/signin");
  }
}
module.exports.isAuthenticated = isAuthenticated;

function forwardAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/dashboard");
}
module.exports.forwardAuthenticated = forwardAuthenticated;