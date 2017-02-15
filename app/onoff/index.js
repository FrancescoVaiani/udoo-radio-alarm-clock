var GPIO = require('onoff').Gpio;
var URL = 'http://radiocapital-lh.akamaihd.net/i/RadioCapital_Live_1@196312/master.m3u8';
var label = "Radio Capital";

var lastValue = 0;
var pause = false;

module.exports =  function(app, pin){
	var button = new GPIO(pin, 'in', 'both');
	console.log('gpio init');
	button.watch(function(err, value){
		if(pause){
			return;
		}
		if(err){
			return console.error(err);
		}
		if(value != lastValue){
            pause = true;
            console.log("pause");
            setTimeout(function(){
                pause = false;
                console.log("unpause");
            },500);
			if(value == 1){
				if(app.radio.status().status){
					app.radio.stop();
					console.log('stop radio');
				} else {
					app.radio.play(URL, label);
					console.log('start radio');
				}
			}
			lastValue = value;
		}
	});
};
