'use strict';
var crypto = require('crypto');
var utils = require('./utils');

module.exports = function () {
	var signUrl = utils.signUrl.bind(this, signingFunction);
	var getSignatureQueryString = utils.getSignatureQueryString.bind(this, signingFunction);

	function signingFunction(privateKey, policyString) {
		return crypto.createSign('RSA-SHA1').update(policyString).sign(privateKey, 'base64');
	}

	return {
		signUrl: signUrl,
		getSignatureQueryString: getSignatureQueryString
	};
}();
