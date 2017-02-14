/**
 * Created by sito on 01/02/2017.
 */

var crud = require('../crud');
//var scheduleDaemon = require('../schedule');

module.exports = function(app){
    // GET ALL
    app.get('/api/schedule', function(req, res){
        crud.getAllSchedule(function(err, schedules){
            if(err){
                return res.json({err:err});
            }
            res.json(schedules);
        });
    });

    // GET ONE BY ID
    app.get('/api/schedule/:id', function (req, res){
        var id = req.params.id;
        crud.getScheduleById(id, function(err, schedule){
            if(err){
                return res.json({err:err});
            }
            if(!schedule){
                schedule = {};
            }
            res.json(schedule);
        })
    });

    // GET ONE BY DAY
    app.get('/api/schedule/day/:day', function(req, res){
        var day = req.params.day;
        crud.getScheduleByDay(day, function(err, schedules){
            if(err){
                return res.json({err:err});
            }
            if(!schedules){
                schedules = {};
            }
            res.json(schedules);
        })
    });

    // INSERT
    app.post('/api/schedule', function(req,res){
        var day = req.body.day;
        var hour = req.body.hour;
        var minute = req.body.minute;
        var radioStation = req.body.radioStation;
        var active = req.body.active;

        crud.insertSchedule(day,hour,minute,radioStation,active, function(err){
            if(err){
                return res.json({err:err});
            }
            crud.getPopulatedScheduleById(this.lastID, function(err, schedule){
                if(err){
                    return res.json({err:err});
                }
                app.schedule.addSchedule(schedule);
                res.json(schedule);
            })
        });
    });

    // UPDATE
    app.put('/api/schedule/:id', function(req,res){
        var id = req.params.id;
        var day = req.body.day;
        var hour = req.body.hour;
        var minute = req.body.minute;
        var radioStation = req.body.radioStation;
        var active = req.body.active;

        crud.updateSchedule(id,day,hour,minute,radioStation,active, function(err){
            if(err){
                return res.json({err:err});
            }
            crud.getPopulatedScheduleById(id, function(err, schedule){
                if(err){
                    return res.json({err:err});
                }
                app.schedule.updateSchedule(schedule);
                res.json(schedule);
            })
        });
    });

    // DELETE
    app.delete('/api/schedule/:id', function(req, res){
        var id = req.params.id;
        crud.deleteSchedule(id, function(err){
            if(err){
                return res.json({err:err});
            }
            app.schedule.deleteSchedule(id);
            res.json({status:'OK'});
        });
    });
};