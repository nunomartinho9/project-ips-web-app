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
        const {title, code} = req.body;
        const user_id = req.user[0].user_id;

        if(req.method === "PUT") {
            

        }else if(req.method === "POST") {

        }
    }

    deleteMonitor(req, res) {
        Monitor.deleteOne(req.params.id, function(err, result) {
            if(err) {
                console.log(err);
                res.sendStatus(404);
            }else {
                res.send(result);//?sinistro
            }
        });
    }

}
module.exports = new MonitorController();