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
	app.use(express.session({
		secret: 'secret', 
		key: 'express.sid',
		store: sessionStore
	}));
});

app.get('/check', function (req, res) {
	res.write("Check this out: session = " + JSON.stringify(req.session));
	res.end();
});

app.get('/set', function (req, res) {
	req.session.value = "once i farted so loud i shat myself";
	res.redirect("/check");
});

//require('./apps/auth')({express:app, httpServer:server, sessionStore:sessionStore});
// Load modules
require('./apps')({ express: app, httpServer: server, sessionStore: sessionStore });

// Start server
server.listen(app.settings.port, function () {
	console.log("Express server listening on port %d in %s mode", app.settings.port, app.settings.env);
});
