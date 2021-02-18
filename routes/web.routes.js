const express = require("express");
const router = express.Router();
const viewsController = require("../controllers/views.controller");
const auth = require("../utils/auth.utils");
/**
 *Roteamento
*/
router.get("/", auth.forwardAuthenticated, viewsController.renderIndex);
router.get("/dashboard", auth.isAuthenticated, viewsController.renderDashboard);
router.get("/signup", auth.forwardAuthenticated, viewsController.renderSignUp);
router.get("/signin", auth.forwardAuthenticated, viewsController.renderSignIn);

module.exports = router;