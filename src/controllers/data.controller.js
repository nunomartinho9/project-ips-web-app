const Data = require("../models/DataModel");

class DataController {

    getAllData(req, res) {

    }

    getDataById(req, res) {
        Data.findOne({monitor_id : req.params.id}, function(err, result) {
            if (err) {
                console.log(err);
                res.sendStatus(404);
            }
            res.json({"data": result});
        });
    }
    
    sendData(req, res) {

    }

}

module.exports = new DataController();