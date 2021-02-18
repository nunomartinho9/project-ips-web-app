/**
 * @class
 */
class HomeController {

    renderIndex(req, res){
        res.render("index", {titleDocument : "Life Guardian"});
    }

    renderSignUp(req, res){
        res.render("signup", {titleDocument : "Life Guardian"});
    }

    renderSignIn(req, res){
        res.render("signin", {titleDocument : "Life Guardian"});
    }

    renderDashboard(req, res){
      res.render("dashboard", {titleDocument : "Dashboard", user: req.user[0].name});
  }
    renderMonitors(req, res){
      res.render("dashboard-monitors", {titleDocument : "Monitores", user: req.user[0].name});
  }
    renderViewMonitor(req, res){
      res.render("dashboard-view-monitor", {titleDocument : "Monitores", user: req.user[0].name});
  }

}

module.exports = new HomeController();