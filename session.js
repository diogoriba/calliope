var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);

app.configure(function () {
	app.use(express.cookieParser());
	app.use(express.session({
		secret: 'secret',
		key: 'express.sid',
		store: new express.session.MemoryStore
	}));
});

app.get('/check', function (req, res) {
	res.write("Check this out: session = " + JSON.stringify(req.session));
	res.end();
});

app.get('/set', function (req, res) {
	req.session.value = "once i farted so loud i shat myself";
	res.write("I've set your session, motherfucker");
	res.end();
});

server.listen(8080, function () { console.log("Yo, i'm listening."); });
