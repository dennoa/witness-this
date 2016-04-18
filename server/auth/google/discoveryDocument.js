'use strict';

var config = require('../../config/environment/index');
var fs = require('fs');
var request = require('request');

var discoveryDocument;

function get() {
  return new Promise(function(resolve, reject) {
    if (discoveryDocument) {
      return resolve(discoveryDocument);
    }
    request.get({ url: config.auth.google.discoveryDocumentUrl, json: true, proxy: config.proxy }, function(err, res, currentDiscoveryDocument) {
      if (err) {
        return fs.readFile(__dirname + '/defaultDiscoveryDocument.json', 'utf8', function(err, doc) {
          if (err) { return reject(err); }
          discoveryDocument = JSON.parse(doc);
          resolve(discoveryDocument);
        });
      }
      discoveryDocument = currentDiscoveryDocument;
      resolve(discoveryDocument);
    });
  });
}

function refresh() {
  discoveryDocument = null;
}

module.exports = {
  get: get,
  refresh: refresh
};
