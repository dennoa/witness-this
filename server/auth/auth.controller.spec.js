'use strict';

var should = require('should');
var authController = require('./auth.controller');
var jwt = require('./jwt');

describe('Auth Controller', function() {

  var req, res;

  beforeEach(function(done) {
    req = {
      body: {
        code: 'some code from the auth provider',
        clientId: 'the client id for the auth provider project',
        redirectUri: 'http://acceptable.for.project.com.au'
      }
    };
    res = {
      status: function(code) {
        return {
          send: function() {},
          json: function() {}
        }
      }
    };
    done();
  });

  it('should provider common token parameters to the auth provider', function(done) {
    var provider = function(params) {
      params.code.should.equal(req.body.code);
      params.client_id.should.equal(req.body.clientId);
      params.redirect_uri.should.equal(req.body.redirectUri);
      params.grant_type.should.equal('authorization_code');
      done();
    };
    authController(provider)(req, res);
  });

  it('should return a JWT of the userInfo', function(done) {
    var userInfo = {
      name: 'My Name',
      email: 'my.email@home.com',
      picture: 'http://link.to.my.picture'
    };
    var provider = function(params, cb) {
      cb(null, userInfo);
      done();
    };
    res.status = function(code) {
      code.should.equal(200);
      return {
        json: function(data) {
          data.token.should.equal(jwt.encode(userInfo))
        }
      };
    }
    authController(provider)(req, res);
  });

});
