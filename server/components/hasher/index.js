'use strict';

var crypto = require('crypto');
var fs = require('fs');
var _ = require('lodash');

//sha256 hash can be encoded to base64 (43 bytes), hex (64 bytes) or binary (32 bytes)
function getFileHash(file) {
  return new Promise(function(resolve) {
    var hash = crypto.createHash('sha256');
    var input = fs.createReadStream(file.path);
    input.on('readable', function() {
      var data = input.read();
      if (data) {
        return hash.update(data);
      }
      resolve({
        name: file.name,
        hash: hash.digest('hex'),
        size: file.size,
        timestamp: Date.now()
      });
    });
  });
}

function getCombinedHash(items) {
  var hash = crypto.createHash('sha256');
  var sorted = _.sortBy(items, 'hash');
  var combinedHash = _.reduce(sorted, function(combined, item) {
    return combined += (item.hash + item.size + item.timestamp);
  }, '');
  hash.update(combinedHash);
  return hash.digest('hex');
}

module.exports = {
  getFileHash: getFileHash,
  getCombinedHash: getCombinedHash
};