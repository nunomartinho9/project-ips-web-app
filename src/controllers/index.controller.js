/**
 * @class
 */
class IndexController {

    renderIndex(req, res){
        if(typeof req.user != 'undefined') {
          res.render("index", {titleDocument : "Life Guardian", user: req.user[0]});
        }else {
          res.render("index", {titleDocument : "Life Guardian"});
        }
    }

    renderSignUp(req, res){
      if(typeof req.user != 'undefined') {
        res.render("signup", {titleDocument : "Registar", user: req.user[0]});
      }else {
        res.render("signup", {titleDocument : "Registar"});
      }
    }

    renderSignIn(req, res){
      if(typeof req.user != 'undefined') {
        res.render("signin", {titleDocument : "Login", user: req.user[0]});
      }else {
        res.render("signin", {titleDocument : "Login"});
      }
    }

    renderDashboard(req, res){
      res.render("dashboard", {titleDocument : "Dashboard", user: req.user[0]});
  }

  renderProfile(req, res) {
    res.render("profile", {titleDocument : "Perfil", user: req.user[0]});
  }

    renderViewMonitor(req, res){
      res.render("dashboard-view-monitor", {titleDocument : "Monitores", user: req.user[0]});
  }

}

module.exports = new IndexController();