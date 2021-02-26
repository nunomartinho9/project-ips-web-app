const Monitor = require("../models/MonitorModel"); 

class MonitorController {

    getAllMonitorsById(req, res) {
        if(typeof req.user != 'undefined') {
            Monitor.findOne({user_id : req.user[0].user_id}, function(err, result) {
                if (err) {
                    console.log(err);
                    res.sendStatus(404);
                }
                res.json({"monitor": result});
            });
        }
    }

    getMonitorById(req, res) {
        Monitor.findOne({monitor_id : req.params.id}, function(err, result) {
            if (err) {
                console.log(err);
                res.sendStatus(404);
            }
            res.json({"monitor": result});
        });

    }
    
    createUpdateMonitor(req, res) {
        const {title, monitor_id} = req.body;
        const user_id = req.user[0].user_id;
        if(req.method === "PUT") {
            Monitor.update({title : title, monitor_id : req.params.id, user_id : user_id}, req.params.id, function(err, result) {
                if(err) {
                    console.log(err);
                    res.sendStatus(404);
                }else {
                    res.send(result);
                }
            });

        }else if(req.method === "POST") {
            Monitor.create(monitor_id, user_id, title, function(err, result) {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                }else {
                    res.send(result);
                }

            });
        }
    }

    deleteMonitor(req, res) {
        Monitor.deleteOne(req.params.id, function(err, result) {
            if(err) {
                console.log(err);
                //res.sendStatus(404);
            }else {
                //res.send(result);
            }
        });
    }

}
module.exports = new MonitorController();