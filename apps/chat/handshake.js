var handshake = function (params) {
	// Parsing parameters
	var app = params['express'],
	 socketio = params['socket.io'];

	// Handshake event
	socketio.set('connection', function (socket) {
		console.log('[%s] Got connection request from [%s]', module.name, socket.handshake.address.address);
	})
};

module.exports = handshake;
