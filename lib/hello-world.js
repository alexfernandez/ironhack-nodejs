'use strict';

var net = require('net');

var server = net.createServer(function(connection) {
	console.log('Connection open');
	connection.write('Hello?');
	connection.on('data', function(data) {
		if (String(data).trim() != 'hello') {
			connection.write('ERROR');
		} else {
			connection.write('world');
			console.log('Connection closed');
		}
	});
});
server.listen(port);
console.log('Server listening on port %s', port);

