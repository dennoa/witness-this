'use strict';

var should = require('should');
var rewire = require('rewire');
var config = require('../../config/environment');
var facebook = rewire('./index');

describe('Facebook OAuth provider handler', function() {

  var mocks, revert;
  var errText = 'expected for testing';
  var mockRequest = {
    get: function(options, cb) { cb(errText); }
  };

  beforeEach(function(done) {
    mocks = {
      request: mockRequest
    };
    revert = facebook.__set__(mocks);
    done();
  });

  afterEach(function(done) {
    revert();
    done();
  });

  it('should retrieve the token from facebook', function(done) {
    var commonTokenParams = {
      code: 'some code from facebook',
      client_id: 'the facebook client id for the project',
      redirect_uri: 'http://acceptable.for.project.com.au'
    };
    mockRequest.get = function(options, cb) {
      options.url.should.equal(config.auth.facebook.tokenEndpoint);
      options.qs.code.should.equal(commonTokenParams.code);
      options.qs.client_id.should.equal(commonTokenParams.client_id);
      options.qs.redirect_uri.should.equal(commonTokenParams.redirect_uri);
      options.qs.client_secret.should.equal(config.auth.facebook.clientSecret);
      options.json.should.equal(true);
      should(options.proxy).equal(config.proxy);
      cb(errText);
    };
    facebook(commonTokenParams, function(err, userInfo) {
      err.should.equal(errText);
      done();
    });
  });

  it('should return token errors from facebook', function(done) {
    var token = {
      error: 'bad_stuff',
      error_description: 'some bad stuff happened'
    };
    mockRequest.get = function(options, cb) {
      cb(null, null, token);
    };
    facebook({}, function(err, userInfo) {
      err.should.equal(token);
      done();
    });
  });

  it('should use the token to retrieve user information from facebook', function(done) {
    var token = {
      access_token: 'some_access_token'
    };
    var getUserInfo = function(options, cb) {
      options.url.should.equal(config.auth.facebook.userInfoEndpoint);
      options.qs.access_token.should.equal(token.access_token);
      options.json.should.equal(true);
      should(options.proxy).equal(config.proxy);
      cb(errText);
    };
    mockRequest.get = function(options, cb) {
      mockRequest.get = getUserInfo;
      cb(null, null, token);
    };
    facebook({}, function(err, userInfo) {
      err.should.equal(errText);
      done();
    });
  });

  it('should return user information from facebook', function(done) {
    var token = {
      access_token: 'some_access_token'
    };
    var facebookUser = {
      email: 'my.email@home.com',
      name: 'My Name',
      id: 'my_id'
    };
    var getUserInfo = function(options, cb) {
      cb(null, null, facebookUser);
    };
    mockRequest.get = function(options, cb) {
      mockRequest.get = getUserInfo;
      cb(null, null, token);
    };
    facebook({}, function(err, userInfo) {
      userInfo.email.should.equal(facebookUser.email);
      userInfo.name.should.equal(facebookUser.name);
      userInfo.picture.should.equal('https://graph.facebook.com/v2.5/' + facebookUser.id + '/picture?type=large');
      done();
    });
  });

});
