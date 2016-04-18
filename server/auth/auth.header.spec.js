'use strict';

var should = require('should');
var jwt = require('./jwt');
var authHeader = require('./auth.header');

describe('Auth Header token extractor', function() {

  var req, authorizationHeaderValue;

  beforeEach(function(done) {
    authorizationHeaderValue = null;
    req = {
      get: function(name) {
        return (name === 'Authorization') ? authorizationHeaderValue : name;
      }
    };
    done();
  });

  it('should return null when no Authorisation Header exists', function(done) {
    var data = authHeader(req);
    should(data).equal(null);
    done();
  });

  it('should return the decoded JSON Web Token when an Authorisation Header exists', function(done) {
    var userInfo = { email: 'my.email@home.com', name: 'My Name' };
    authorizationHeaderValue = 'Bearer ' + jwt.encode(userInfo);
    var data = authHeader(req);
    data.email.should.equal(userInfo.email);
    data.name.should.equal(userInfo.name);
    done();
  });

});
