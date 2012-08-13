var init = function (params) {
	// Parse arguments
	var server = params['httpServer'];

	// Require
	var socketio = require('socket.io').listen(server);
	params['io'] = socketio;

	// Load modules
	exports.handshake = require('./handshake.js')(params);
};

module.exports = init;
