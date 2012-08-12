// Require
var express = require('express'),
	fs = require('fs'),
	http = require('http'),
	connect = require('connect');

// Setting up server
var app = express(),
	server = http.createServer(app);

// Configuration
app.configure(function () {
	app.use(app.router);
});

app.configure('development', function () {
	app.set('port', 3000);
	app.use(express.static(__dirname + '/public'));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
	var oneYear = 365 * 24 * 60 * 60;
	app.use(express.static(__dirname + ' /public', { maxAge: oneYear }));
	app.use(express.errorHandler());
});

// Load modules
require('./apps')({ express: app, httpServer: server });

// Start server
server.listen(app.settings.port, function () {
	console.log("Express server listening on port %d in %s mode", app.settings.port, app.settings.env);
});
