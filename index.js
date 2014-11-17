'use strict';

var express = require('express');
var kraken = require('kraken-js');

var app = express();
var options = require('./lib/spec')(app);
var port = process.env.PORT || 18080;

app.use(kraken(options));
app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});

app.listen(port, function () {
    console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
});