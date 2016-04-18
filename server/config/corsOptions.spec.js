'use strict';

var should = require('should');
var corsOptions = require('./corsOptions.js');
var _ = require('lodash');

describe('CORS options', function() {

  var acceptableOrigins = [
    //'http://localhost:9000'
  ];

  it('should allow requests from acceptable origins', function(done) {
    var tests = [];
    _.forEach(acceptableOrigins, function(origin) {
      tests.push(new Promise(function(resolve) {
        corsOptions.origin(origin, function(err, isSupported) {
          should(isSupported).equal(true);
          resolve();
        });
      }));
    });
    Promise.all(tests).then(function(results) {
      done();
    });
  });

});
