const express = require("express");
const router = express.Router();
const monitorController = require("../controllers/monitor.controller");
const dataController = require("../controllers/data.controller");
/**
 *Roteamento
*/
router.get("/dashboard/monitors", monitorController.getAllMonitorsById);
router.get("/dashboard/monitor/:id", dataController.getDataById);

router.post("/dashboard/create-monitor", monitorController.createUpdateMonitor);
router.put("/dashboard/update-monitor/:id", monitorController.createUpdateMonitor);
router.delete("/dashboard/delete-monitor/:id", monitorController.deleteMonitor);

module.exports = router;