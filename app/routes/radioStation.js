/**
 * Created by sito on 01/02/2017.
 */

var crud = require('../crud');

module.exports = function(app){
    // GET ALL
    app.get('/api/radioStation', function(req, res){
        crud.getAllRadioStations(function(err, radioStations){
            if(err){
                return res.json({err:err});
            }
            res.json(radioStations);
        });
    });

    // GET ONE BY ID
    app.get('/api/radioStation/:id', function (req, res){
        var id = req.params.id;
        crud.getRadioStationById(id, function(err, radioStation){
            if(err){
                return res.json({err:err});
            }
            if(!radioStation){
                radioStation = {};
            }
            res.json(radioStation);
        })
    });

    // INSERT
    app.post('/api/radioStation', function(req,res){
        var radioStation = req.body.radioStation;
        var label = req.body.label;
        crud.insertRadioStation(radioStation, label, function(err){
            if(err){
                return res.json({err:err});
            }
            crud.getRadioStationById(this.lastID, function(err, radioStation){
                if(err){
                    return res.json({err:err});
                }
                res.json(radioStation);
            })
        });
    });

    // UPDATE
    app.put('/api/radioStation/:id', function(req,res){
        var id = req.params.id;
        var day = req.body.day;
        var hour = req.body.hour;
        var minute = req.body.minute;
        var radioStation = req.body.radioStation;
        var active = req.body.active;

        crud.updateRadioStation(id,day,hour,minute,radioStation,active, function(err){
            if(err){
                return res.json({err:err});
            }
            crud.getRadioStationById(id, function(err, radioStation){
                if(err){
                    return res.json({err:err});
                }
                res.json(radioStation);
            })
        });
    });

    // DELETE
    app.delete('/api/radioStation/:id', function(req, res){
        var id = req.params.id;
        crud.deleteRadioStation(id, function(err){
            if(err){
                return res.json({err:err});
            }
            res.json({status:'OK'});
        });
    });
};