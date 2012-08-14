var auth = function (params) {
	// Parse args
	var app = params['express'],
		sessionStore = params['sessionStore'];

	// Require
	var graph = require('fbgraph');
	var config = require('./config.js');

	// Routes
	app.get('/auth', function (req, res) {
		if (!req.query.code) { // no code available
			if (!req.query.error) {
				var authUrl = graph.getOauthUrl({ 
					client_id: config.client_id, 
					redirect_uri: config.redirect_uri,
				});
				res.redirect(authUrl);
			} else {
				res.writeHead(403);
				res.write("Access Denied");
				res.end();
			}
		} else { // code available, let's get access token
			var session = req.session;
			graph.authorize({
				client_id: config.client_id,
				client_secret: config.client_secret,
				redirect_uri: config.redirect_uri,
				code: req.query.code,
			}, function (err, facebookRes) {
				// facebookRes is a json object with the following properties:
				// access_token (string), expires (string)
				// we probably want to store this in the user session so we can retrieve it via socketio later
				session.fbToken = facebookRes.access_token;
				res.redirect('/auth/loggedIn');
			});
		}
	});

	app.get('/auth/loggedIn', function (req, res) {
		res.writeHead(200);
		console.log("trying to read this shit: " + JSON.stringify(req.session))
		console.log("my session id: " + req.sessionID);
		console.log("whats in the store: " + JSON.stringify(sessionStore));
		res.write("TADAAAAA " + req.session.fbToken);
		res.end();
	});
};

module.exports = auth;
