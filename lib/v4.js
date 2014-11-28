'use strict';
var crypto = require('crypto');
var utils = require('./utils');

module.exports = function () {
	var signUrl = utils.signUrl.bind(this, signingFunction);
	var getSignatureQueryString = utils.getSignatureQueryString.bind(this, signingFunction);

	function signingFunction(privateKey, policyString) {
		return crypto.createHmac('SHA256', privateKey).update(policyString).digest('base64');
	}

	return {
		signUrl: signUrl,
		getSignatureQueryString: getSignatureQueryString
	};
}();
