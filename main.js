var express = require('express'), 
http = require('http'),
fs = require('fs');

var port = 80;
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
	res.writeHead(200);
	fs.readFile('/public/index.html', function (err, content) {
		res.end(content);
	})
});

io.sockets.on('connection', function (socket) {
	console.log('Got connection request from [' + socket.handshake.address.address + ']');
	socket.emit('connected');
	socket.on('init', function (data) {
		console.log('Got connection init info from [' + socket.handshake.address.address + ']');
		console.log(socket.handshake.address.address + ' is now known as ' + data.login);
	});
});

server.listen(port);
console.log("Server started on http://localhost:"+port);
