var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var helmet = require('helmet');

// configuration ===========================================
// config files

// set our port
var port = process.env.PORT || 8080;

//security module
app.use(helmet());

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
require('./app/crud').setup();
app.radio = require('./app/radio');
app.schedule = require('./app/schedule');
app.schedule.setup(app);
// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


// routes ==================================================
require('./app/routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
server.listen(port, function () {
  // Listening
  //try {
  //    var uid = parseInt(process.env.SUDO_UID);
  //    if (uid) {
  //        process.setuid(uid);
  //    }
  //    console.log('Server\'s UID is now ' + process.getuid());
  //} catch (err) {
  //    console.log('Cowardly refusing to keep the process alive as root.');
  //    process.exit(1);
  //}
  // shoutout to the user
  console.log('Magic happens on port ' + port);
});

// expose app
exports = module.exports = app;