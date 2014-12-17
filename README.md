#cloudfront-private-url-creator

Creates and signs private Cloudfront Urls (http:, https:, rtmp:, rtmpt:, rtmpe:, and rtmpte:)

[![NPM](https://nodei.co/npm/cloudfront-private-url-creator.png)](https://nodei.co/npm/cloudfront-private-url-creator/)

[![Build Status](https://travis-ci.org/maxnachlinger/cloudfront-private-url-creator.svg?branch=master)](https://travis-ci.org/maxnachlinger/cloudfront-private-url-creator)

### Installation:
```
npm install cloudfront-private-url-creator
```
### Usage:
```javascript
"use strict";
var fs = require('fs');
var cf = require('cloudfront-private-url-creator');

var urlToSign = 'https://somedistro.cloudfront.net/somefolder/someFile';
var keyPairId = 'yourKeyPaidId';
var privateKeyPath = './yourKey.pem';

// date when the private url will expire (1 hour from now in this case)
var dateLessThan = new Date();
dateLessThan.setHours(dateLessThan.getHours() + 1);

loadPrivateKey(function privateKeyCb(err, keyContents) {
  if (err) {
    console.error(err);
    return;
  }
  var config = {
    privateKey: keyContents,
    keyPairId: keyPairId,
    dateLessThan: dateLessThan
    //dateGreaterThan: new Date(...),
    //ipAddress: 88.127.108.22/32,
    //accessAllObjectsInDirectory: {true, false}
  };
  // sign the url and return it, or just get the signature
  var signatureQueryString = cf.getSignatureQueryString(urlToSign, config);
  // OR
  var signedUrl = cf.signUrl(urlToSign, config);
});

function loadPrivateKey(cb) {
  fs.realpath(privateKeyPath, function (err, resolvedPath) {
    if (err) {
      return cb(err);
    }

    fs.readFile(resolvedPath, function (err, data) {
      if (err) {
        return cb(err);
      }
      cb(null, data);
    });
  });
}
```
### Relevant AWS docs:
[Creating a Signed URL Using a Canned Policy](http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-creating-signed-url-canned-policy.html)

[Creating a Signed URL Using a Custom Policy](http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-creating-signed-url-custom-policy.html)

## Contributors
[Here's a list, thanks for your help!](https://github.com/maxnachlinger/cloudfront-private-url-creator/graphs/contributors)
