function connect() {
	console.log('attempting connection');
	var socket = io.connect('http://localhost');
	socket.on('connected', function () { 
		console.log('got connection mothafucka!'); 
		socket.emit("init", { login:$('#login').val() });
	});
}
