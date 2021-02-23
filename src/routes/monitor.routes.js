const express = require("express");
const router = express.Router();
const monitorController = require("../controllers/monitor.controller");

/**
 *Roteamento
*/
router.get("/monitors", monitorController.getAllMonitorsById);
router.get("/dashboard/monitor/:id", monitorController.getMonitorById);

router.post("/dashboard/create-monitor", monitorController.createUpdateMonitor);
router.put("/dashboard/update-monitor/:id", monitorController.createUpdateMonitor);
router.delete("/dashboard/delete-monitor/:id", monitorController.deleteMonitor);

module.exports = router;