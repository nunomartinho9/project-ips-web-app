/**
 * @class
 */
class IndexController {

    renderIndex(req, res){
        res.render("index", {titleDocument : "Life Guardian", user: req.user});
    }

    renderSignUp(req, res){
        res.render("signup", {titleDocument : "Life Guardian", user: req.user});
    }

    renderSignIn(req, res){
        res.render("signin", {titleDocument : "Life Guardian", user: req.user});
    }

    renderDashboard(req, res){
      res.render("dashboard", {titleDocument : "Dashboard", user: req.user[0]});
  }

    renderViewMonitor(req, res){
      res.render("dashboard-view-monitor", {titleDocument : "Monitores", user: req.user});
  }

}

module.exports = new IndexController();