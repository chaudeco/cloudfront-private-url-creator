'use strict';
var fs = require('fs');
var path = require('path');
var querystring = require('querystring');

var common = exports;

var privateKeyPath = path.join(__dirname, '/fixtures/private-key.pem');
var privateKey;

common.loadPrivateKey = function (cb) {
	if (privateKey) {
		return setImmediate(function() {
			cb(null, privateKey);
		});
	}

	fs.realpath(privateKeyPath, function (err, resolvedPath) {
		if (err) {
			return cb(err);
		}

		fs.readFile(resolvedPath, function (err, data) {
			if (err) {
				return cb(err);
			}
			privateKey = data;
			cb(null, privateKey);
		});
	});
};

common.queryStringHasKeysValues = function (t, url, keysValues) {
	var queryStringKeysValues = querystring.parse(url.slice(url.indexOf('?') + 1));
	for (var key in keysValues) {
		if (keysValues.hasOwnProperty(key)) {
			t.equal(keysValues[key], queryStringKeysValues[key], key + " matches [" + queryStringKeysValues[key] + "]");
		}
	}
};
