'use strict';

var should = require('should');
var jwt = require('./jwt');
var jwtSimple = require('jwt-simple');
var config = require('../config/environment');

describe('JSON Web Token (JWT) Helper', function() {

  it('should encode data using the configured jwt secret key', function(done) {
    var data = { someData: 'some data', other: 'some other data' };
    var token = jwt.encode(data);
    token.should.equal(jwtSimple.encode(data, config.auth.jwt.secret));
    done();
  });

  it('should decode data using the configured jwt secret key', function(done) {
    var data = { someData: 'some data', other: 'some other data' };
    var token = jwtSimple.encode(data, config.auth.jwt.secret);
    var decoded = jwt.decode(token);
    decoded.someData.should.equal(data.someData);
    decoded.other.should.equal(data.other);
    done();
  });

  it('should return undefined when attempting to decode data that was encoded using some other key', function(done) {
    var data = { someData: 'some data', other: 'some other data' };
    var token = jwtSimple.encode(data, 'some_other_key');
    var decoded = jwt.decode(token);
    should(decoded).be.undefined();
    done();
  });

});
