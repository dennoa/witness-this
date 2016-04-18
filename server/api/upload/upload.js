'use strict';

var formidable = require('formidable');
var _ = require('lodash');
var crypto = require('crypto');
var fs = require('fs');
var hasher = require('../../components/hasher');
var myStuff = require('../../components/myStuff');


function register(results, combinedHash, cb) {
  myStuff.register(combinedHash, function(err) {
    if (err) { return cb(err); }
    var model = {
      userId: 'just.me@for.now.com',
      items: results
    };
    myStuff.model.update({ userId: model.userId }, model, {upsert: true}, cb);
  });
}

function upload(req, res) {
  var form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, function(err, fields, files) {
    var fileHashes = [];
    _.forEach(files, function(file) {
      fileHashes.push(hasher.getFileHash(file));
    });
    Promise.all(fileHashes).then(function(results) {
      var combinedHash = hasher.getCombinedHash(results);
      register(results, combinedHash, function(err) {
        if (err) { return res.status(500).send(err); }
        res.status(200).json({results: results, hash: combinedHash});
      });
    });
  });
}

module.exports = upload;
