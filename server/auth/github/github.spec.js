'use strict';

var should = require('should');
var rewire = require('rewire');
var config = require('../../config/environment');
var github = rewire('./index');

describe('GitHub OAuth provider handler', function() {

  var mocks, revert;
  var errText = 'expected for testing';
  var mockRequest = {
    get: function(options, cb) { cb(errText); }
  };

  beforeEach(function(done) {
    mocks = {
      request: mockRequest
    };
    revert = github.__set__(mocks);
    done();
  });

  afterEach(function(done) {
    revert();
    done();
  });

  it('should retrieve the token from github', function(done) {
    var commonTokenParams = {
      code: 'some code from github',
      client_id: 'the github client id for the project',
      redirect_uri: 'http://acceptable.for.project.com.au'
    };
    mockRequest.get = function(options, cb) {
      options.url.should.equal(config.auth.github.tokenEndpoint);
      options.qs.code.should.equal(commonTokenParams.code);
      options.qs.client_id.should.equal(commonTokenParams.client_id);
      options.qs.redirect_uri.should.equal(commonTokenParams.redirect_uri);
      options.qs.client_secret.should.equal(config.auth.github.clientSecret);
      options.json.should.equal(true);
      should(options.proxy).equal(config.proxy);
      cb(errText);
    };
    github(commonTokenParams, function(err, userInfo) {
      err.should.equal(errText);
      done();
    });
  });

  it('should return token errors from github', function(done) {
    var token = {
      error: 'bad_stuff',
      error_description: 'some bad stuff happened'
    };
    mockRequest.get = function(options, cb) {
      cb(null, null, token);
    };
    github({}, function(err, userInfo) {
      err.should.equal(token);
      done();
    });
  });

  it('should use the token to retrieve user information from github', function(done) {
    var token = {
      access_token: 'some_access_token'
    };
    var getUserInfo = function(options, cb) {
      options.url.should.equal(config.auth.github.userInfoEndpoint);
      options.headers['User-Agent'].should.equal('Node');
      options.qs.access_token.should.equal(token.access_token);
      options.json.should.equal(true);
      should(options.proxy).equal(config.proxy);
      cb(errText);
    };
    mockRequest.get = function(options, cb) {
      mockRequest.get = getUserInfo;
      cb(null, null, token);
    };
    github({}, function(err, userInfo) {
      err.should.equal(errText);
      done();
    });
  });

  it('should return user information from github', function(done) {
    var token = {
      access_token: 'some_access_token'
    };
    var githubUser = {
      email: 'my.email@home.com',
      name: 'My Name',
      avatar_url: 'http://my-avatar.com.au'
    };
    var getUserInfo = function(options, cb) {
      cb(null, null, githubUser);
    };
    mockRequest.get = function(options, cb) {
      mockRequest.get = getUserInfo;
      cb(null, null, token);
    };
    github({}, function(err, userInfo) {
      userInfo.email.should.equal(githubUser.email);
      userInfo.name.should.equal(githubUser.name);
      userInfo.picture.should.equal(githubUser.avatar_url);
      done();
    });
  });

});
