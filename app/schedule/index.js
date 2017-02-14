/**
 * Created by sito on 31/01/2017.
 */
var schedule = require('node-schedule');
var db = require('../crud');
//var radio = require('../radio');

var scheduleMap = {};
var masterApp;

var addSchedule = function(sched){
    var id = sched.rowid;
    var day = sched.day;
    var hour = sched.hour;
    var minute = sched.minute;
    var radioStation = sched.radio_station;
    var label = sched.label;
    var scheduleString = minute + " " + hour + " * * " + day ;

    scheduleMap[id] = schedule.scheduleJob(scheduleString, function () {
        masterApp.radio.play(radioStation, label);
    });
};

var deleteSchedule = function(id){
    if(scheduleMap[id]) {
        scheduleMap[id].cancel();
        delete scheduleMap[id];
    }
};

module.exports = {
    setup: function(app) {
        masterApp = app;
        db.getAllActiveSchedule(function(err, schedules){
            if(err){
                return console.error(err);
            }
            for(var i = 0; i < schedules.length; i++){
                addSchedule(schedules[i]);
            }
        });
    },
    addSchedule: addSchedule,
    updateSchedule: function(sched){
        deleteSchedule(sched.rowid);
        addSchedule(sched);
    },
    deleteSchedule: deleteSchedule
};