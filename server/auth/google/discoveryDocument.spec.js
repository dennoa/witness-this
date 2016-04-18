'use strict';

var should = require('should');
var rewire = require('rewire');
var discoveryDocument = rewire('./discoveryDocument');
var config = require('../../config/environment');

describe('Google Discovery Document lookup', function() {

  var mocks, revert;
  var errText = 'expected for testing';
  var mockRequest = {
    get: function(options, cb) { cb(errText); }
  };

  beforeEach(function(done) {
    mocks = {
      request: mockRequest
    };
    revert = discoveryDocument.__set__(mocks);
    discoveryDocument.refresh();
    done();
  });

  afterEach(function(done) {
    revert();
    done();
  });

  it('should retrieve the discovery document from google', function(done) {
    var googleDoc = { authorization_endpoint: 'https;//some.endpoint.com' };
    mockRequest.get = function(options, cb) {
      options.url.should.equal(config.auth.google.discoveryDocumentUrl);
      options.json.should.equal(true);
      should(options.proxy).equal(config.proxy);
      cb(null, null, googleDoc);
    };
    discoveryDocument.get().then(function(doc) {
      doc.should.equal(googleDoc);
      done();
    });
  });

  it('should use the default discovery document if the google lookup fails', function(done) {
    mockRequest.get = function(options, cb) {
      cb(errText);
    };
    discoveryDocument.get().then(function(doc) {
      doc.authorization_endpoint.should.equal('https://accounts.google.com/o/oauth2/v2/auth');
      done();
    }, done);
  });

  it('should cache the discovery document between requested refreshes', function(done) {
    var googleDoc = { authorization_endpoint: 'https;//some.endpoint.com' };
    mockRequest.get = function(options, cb) {
      cb(null, null, googleDoc);
    };
    discoveryDocument.get().then(function(doc) {
      doc.should.equal(googleDoc);

      mockRequest.get = function(options, cb) {
        cb('unexpected error - this should not have been invoked');
      };
      discoveryDocument.get().then(function(doc) {
        doc.should.equal(googleDoc);
        done();
      });
    }, done);
  });

});
