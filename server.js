/**
 * Module dependencies.
 */
var config = require('./config')
var express = require('express');
var time = require('./routes/time');
var bodyParser   = require('body-parser');
var port = config.port;
var app = express();

// all environments
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/time', time.receive);

app.listen(port);
console.log('Listen on port: ' + port);
