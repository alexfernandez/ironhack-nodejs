'use strict';

var net = require('net');

var port = 11311;

var cache = {};

var server = net.createServer(function(connection) {
	console.log('Connection open');
	connection.on('data', function(data) {
		var line = String(data).trim();
		var words = line.split(' ');
		var command = words[0];
		if (command == 'quit' && words.length == 1) {
			console.log('Closing connection');
			return connection.end();
		}
		if (words.length < 2) {
			return error(connection);
		}
		var key = words[1];
		if (command == 'get') {
			if (words.length != 2) {
				return error(connection);
			}
			if (key in cache) {
				return write(connection, 'VALUE ' + key + ' ' + cache[key]);
			}
			return write(connection, 'END');
		}
		if (command == 'set') {
			if (words.length != 3)
			{
				return error(connection);
			}
			cache[key] = words[2];
			return write(connection, 'STORED');
		}
		if (command == 'delete') {
			if (key in cache) {
				delete cache[key];
				return write(connection, 'DELETED');
			}
			return write(connection, 'NOT_FOUND');
		}
		return write(connection, 'ERROR');
	});
});

server.listen(port);
console.log('Server listening on port %s', port);

/**
 * Show an error on the given connection.
 */
function error(connection) {
	write(connection, 'ERROR');
}

function write(connection, message) {
	connection.write(message + '\r\n');
}

