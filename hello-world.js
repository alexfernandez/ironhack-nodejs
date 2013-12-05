'use strict';

var net = require('net');

var server = net.createServer(function(connection) {
	console.log('Connection open');
	connection.write('Hello?\r\n');
	connection.on('data', function(data) {
		if (String(data).trim() != 'hello') {
			connection.write('ERROR\r\n');
		} else {
			connection.write('world\r\n');
			console.log('Connection closed');
		}
	});
});
server.listen(port);
console.log('Server listening on port %s', port);

