'use strict';

var formidable = require('formidable');
var _ = require('lodash');
var hasher = require('../../components/hasher');
var myStuff = require('../../components/myStuff');


function verifyCombinedHash(items, cb) {
  var combinedHash = hasher.getCombinedHash(items);
  myStuff.getKey(function(err, key) {
    if (err) { return cb(err); }
    cb(null, (combinedHash === key));
  });
}

function verifyFileHashes(fileHashes, cb) {
  myStuff.model.findOne({ userId: 'just.me@for.now.com' }, function(err, model) {
    if (err) { return cb(err); }
    verifyCombinedHash(model.items, function(err, isCombinedHashValid) {
      if (err) { return cb(err); }
      _.forEach(fileHashes, function(fileHash) {
        var existing = _.find(model.items, function(item) {
          return ((item.hash === fileHash.hash) && (item.size === fileHash.size));
        });
        if (existing) {
          fileHash.timestamp = existing.timestamp
        }
        fileHash.isValid = (isCombinedHashValid && existing);
      });
      cb(null);
    });
  });
}

function validate(req, res) {
  var form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, function(err, fields, files) {
    var fileHashes = [];
    _.forEach(files, function(file) {
      fileHashes.push(hasher.getFileHash(file));
    });
    Promise.all(fileHashes).then(function(results) {
      verifyFileHashes(results, function(err) {
        if (err) { return res.status(500).send(err); }
        res.status(200).json({results: results});
      })
    });
  });
}

module.exports = validate;
