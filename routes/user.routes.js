const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

/**
 *Roteamento
*/
router.post("/signup", userController.createUser);
router.post("/signin", userController.signIn);

router.post("/mobile-signin", userController.mobileSignIn);
router.post("/mobile-signout", userController.mobileSignOut);
router.get("/signout", userController.signOut);

module.exports = router;