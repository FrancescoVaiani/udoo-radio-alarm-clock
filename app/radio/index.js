/**
 * Created by sito on 30/01/2017.
 */

const spawn = require('child_process').spawn;
const isEmpty = require('is-empty');

var radio = {};

var play = function (streamURL, label) {
    radio.label = label;
    radio.streamURL = streamURL;
    // radio.player = spawn('mplayer -cache 3000 -loop 0 "'+ streamURL + '"');
    var array = ["-cache","3000","-loop","0",streamURL];
    radio.player = spawn('mplayer',array,{
        detached: true,
        stdio: 'ignore'
    });
    return radio.player.pid;
};

var stop = function (){
    if(!isEmpty(radio) && radio.player){
        radio.player.kill('SIGINT');
        radio = {};
    }
};

module.exports = {
    play: function(url, label){
        if(!isEmpty(radio) && radio.player && radio.url == url){
            return;
        }
        if(!isEmpty(radio)) {
            stop();
        }
        play(url, label);
    },
    stop: stop,
    status: function(){return isEmpty(radio)?{status: false}:{status:true, label:radio.label}}
};
