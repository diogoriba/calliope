// Require
var express = require('express'),
	http = require('http'),
	fs = require('fs'),
	MemoryStore = express.session.MemoryStore;

// Setting up server
var app = express(),
	server = http.createServer(app),
	sessionStore = new MemoryStore({ reapInterval: 60000 * 10 });

// Configuration
app.configure('development', function () {
	app.set('port', 3000);
	app.use(express.static(__dirname + '/public'));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	app.use(express.cookieParser());
	sessionStore.clear();
	app.use(express.session({
		secret: 'secret', 
		key: 'express.sid',
		store: sessionStore,
		cookie: { maxAge: 365*24*60*60*1000, httpOnly: false }
	}));
});

console.log("whats in the store: " + JSON.stringify(sessionStore));
// Load modules
require('./apps')({ express: app, httpServer: server, sessionStore: sessionStore });

// Start server
server.listen(app.settings.port, function () {
	console.log("Express server listening on port %d in %s mode", app.settings.port, app.settings.env);
});