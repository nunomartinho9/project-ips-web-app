const express = require("express");
const router = express.Router();
const dataController = require("../controllers/data.controller");

router.post("/arduino/send-data/:code", dataController.sendData);

module.exports = router;