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
// use basic authentication
app.use(function(req, res, next) {
    var user = auth(req);

    if (user === undefined || user['name'] !== config.authUser || user['pass'] !== config.authPass) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="NodeGeofency"');
        res.end('Unauthorized');
    } else {
        next();
    }
});

app.post('/time', time.receive);

app.listen(port);
console.log('Listen on port: ' + port);
