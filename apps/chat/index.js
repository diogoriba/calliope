var init = function (params) {
	// Parse arguments
	var server = params['httpServer'];

	// Require
	var socketio = require('socket.io').listen(server);
	params['socket.io'] = socketio;

	// Load modules
	//exports.auth = require('./auth.js')(params);
	exports.handshake = require('./handshake.js')(params);
};

module.exports = init;
