var handshake = function (params) {
	// Parsing parameters
	var app = params['express'],
		io = params['io'],
		sessionStore = params['sessionStore'];

	// Require
	var parseCookie = require('connect').utils.parseCookie;

	// Handshake event
	io.sockets.on('connection', function (socket) {
		console.log('Got connection request from [%s]', socket.handshake.address.address);
		console.log('The sessionID is = %s', socket.handshake.sessionID);
	});

	io.set('authorization', function (data, accept) {
		if (!data.headers.cookie) {
			return accept('no cookie', false);
		}

		data.cookie = parseCookie(data.headers.cookie);
		data.sessionID = data.cookie['express.sid'];
		data.sessionStore = sessionStore;
		sessionStore.get(data.sessionID, function (err, session) {
			if (err || !session) {
				return accept('no session', false);
			}
			data.session = session;
			accept(null, true);
		});
	});
};

module.exports = handshake;
