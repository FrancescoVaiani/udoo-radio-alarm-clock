/**
 * Created by sito on 31/01/2017.
 */

var sqlite3 = require('sqlite3');

var config = require('../../config/db');

const scheduleTableName = config.scheduleTableName;
const radioStationTableName = config.radioStationTableName;

module.exports = {
    //SETUP
    setup: function(){
        var database = new sqlite3.Database(config.name);

        const scheduleTableCreate = "" +
            "CREATE TABLE " +
            "IF NOT EXISTS " +
            config.scheduleTableName + " (" +
            "day INTEGER, " +
            "hour INTEGER, " +
            "minute INTEGER," +
            "radio_station_id INTEGER," +
            "active INTEGER" +
            ");";

        const radioStationTableCreate = "" +
            "CREATE TABLE " +
            "IF NOT EXISTS " +
            config.radioStationTableName + " (" +
            "radio_station TEXT," +
            "label TEXT " +
            ");";

        database.serialize(function(){
            database.run(scheduleTableCreate, function(err){
                if(err)
                    console.err(err);
            });
            database.run(radioStationTableCreate, function(err){
                if(err)
                    console.err(err);
            });
        });

        database.close();
    },

    //SELECT
    getAllSchedule: function(callback){
        var db = new sqlite3.Database(config.name);
        db.serialize(function(){
            db.all('SELECT s.rowid AS rowid, s.day AS day, s.hour AS hour, s.minute AS minute, r.radio_station AS radio_station, r.label AS label ' +
                'FROM ' + scheduleTableName + " AS s " +
                "JOIN " + radioStationTableName + " AS r " +
                "ON s.radio_station_id = r.rowid ", callback);
        });
        db.close();
    },

    getAllActiveSchedule: function(callback){
        var db = new sqlite3.Database(config.name);
        db.serialize(function(){
            db.all('SELECT s.rowid AS rowid, s.day AS day, s.hour AS hour, s.minute AS minute, r.radio_station AS radio_station, r.label AS label ' +
                'FROM ' + scheduleTableName + " AS s " +
                "JOIN " + radioStationTableName + " AS r " +
                "ON s.radio_station_id = r.rowid " +
                "WHERE s.active = 1", callback);
        });
        db.close();
    },

    getScheduleById: function(id,callback){
        var db = new sqlite3.Database(config.name);
        db.serialize(function(){
            db.get("SELECT rowid, * FROM " + scheduleTableName + " WHERE rowid = ?", id, callback);
        });
        db.close();
    },

    getPopulatedScheduleById: function(id,callback){
        var db = new sqlite3.Database(config.name);
        db.serialize(function(){
            db.get('SELECT s.rowid AS rowid, s.day AS day, s.hour AS hour, s.minute AS minute, r.radio_station AS radio_station, r.label AS label ' +
                'FROM ' + scheduleTableName + " AS s " +
                "JOIN " + radioStationTableName + " AS r " +
                "ON s.radio_station_id = r.rowid " +
                "WHERE s.active = 1 AND rowid = ?", id, callback);
        });
        db.close();
    },

    getScheduleByDay: function(day,callback){
        var db = new sqlite3.Database(config.name);
        db.serialize(function(){
            db.all("SELECT rowid, * FROM " + scheduleTableName + " WHERE day = ?", day, callback);
        });
        db.close();
    },

    getAllRadioStations: function(callback){
        var db = new sqlite3.Database(config.name);
        db.serialize(function(){
            db.all("SELECT rowid, * FROM " + radioStationTableName , callback);
        });
        db.close();
    },

    getRadioStationById: function(id, callback){
        var db = new sqlite3.Database(config.name);
        db.serialize(function(){
            db.get("SELECT rowid, * FROM " + radioStationTableName + " WHERE rowid = ?", id, callback);
        });
        db.close();
    },

    //INSERT
    insertSchedule: function(day, hour, minute, radioStationId, active, callback){
        var db = new sqlite3.Database(config.name);
        db.serialize(function(){
            db.run("INSERT INTO " + scheduleTableName + " VALUES ($day, $hour, $minute, $rsid, $active)",
                {
                    $day: day,
                    $hour: hour,
                    $minute: minute,
                    $rsid: radioStationId,
                    $active: active
                },
                callback
            );
        });
        db.close();
    },

    insertRadioStation: function(radioStation, label, callback){
        var db = new sqlite3.Database(config.name);
        db.serialize(function(){
            db.run("INSERT INTO " + radioStationTableName + " VALUES ($url, $label)",
                {
                    $url: radioStation,
                    $label: label
                },
                callback);
        });
        db.close();
    },

    //UPDATE
    updateSchedule: function(id, day, hour, minute, radioStationId, active, callback){
        var db = new sqlite3.Database(config.name);
        db.serialize(function(){
            db.run("UPDATE " + scheduleTableName + " SET " +
                "day = $day, " +
                "hour = $hour, " +
                "minute = $minute, " +
                "radio_station_id = $rsid, " +
                "active = $active " +
                "WHERE rowid = $id",
                {
                    $day: day,
                    $hour: hour,
                    $minute: minute,
                    $rsid: radioStationId,
                    $active: active,
                    $id: id
                },
                callback
            );
        });
        db.close();
    },

    updateRadioStation: function(id, radioSation, callback){
        var db = new sqlite3.Database(config.name);
        db.serialize(function(){
            db.run("UPDATE " + radioStationTableName + " SET radio_station = ? WHERE rowid = ?", radioStation, id, callback);
        });
        db.close();
    },

    //DELETE
    deleteSchedule: function(id,callback){
        var db = new sqlite3.Database(config.name);
        db.serialize(function(){
            db.run("DELETE FROM " + scheduleTableName + " WHERE rowid = ?", id, callback);
        });
        db.close();
    },

    deleteRadioStation: function(callback){
        var db = new sqlite3.Database(config.name);
        db.serialize(function(){
            db.run("DELETE FROM " + radioStationTableName + " WHERE rowid = ?", id, callback);
        });
        db.close();
    }

};