/**
 * Module dependencies.
 */

var express = require('express');
var time = require('./routes/time');
var http = require('http');
var path = require('path');
var bodyParser   = require('body-parser');
var errorhandler = require('errorhandler')
var port     = process.env.PORT || 8765;
var app = express();

// all environments
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// development only
if ('development' === app.get('env')) {
  app.use(errorhandler());
}

app.post('/time', time.receive);

app.listen(port);
console.log('Listen on ' + port);
