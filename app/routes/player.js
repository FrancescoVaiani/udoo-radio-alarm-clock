/**
 * Created by sito on 03/02/2017.
 */

var URL = 'http://radiocapital-lh.akamaihd.net/i/RadioCapital_Live_1@196312/master.m3u8';
var label = "Radio Capital";

module.exports = function(app){
    //GET RADIO STATUS
    app.get('/api/radio/status', function (req, res){
        res.json(app.radio.status());
    });

    app.get('/api/radio/play', function (req, res){
        var status = app.radio.play(URL, label);
        res.json({status: true, label:label});
    });

    app.get('/api/radio/stop', function (req, res){
        app.radio.stop();
        res.json({status: false});
    });
};