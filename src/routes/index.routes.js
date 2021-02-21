const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index.controller");
const auth = require("../utils/auth.utils");
/**
 *Roteamento
*/
router.get("/", auth.forwardAuthenticated, indexController.renderIndex);
router.get("/dashboard", auth.isAuthenticated, indexController.renderDashboard);
router.get("/signup", auth.forwardAuthenticated, indexController.renderSignUp);
router.get("/signin", auth.forwardAuthenticated, indexController.renderSignIn);
router.get("/profile", auth.isAuthenticated, indexController.renderProfile);
module.exports = router;