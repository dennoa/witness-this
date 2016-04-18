'use strict';

var should = require('should');
var rewire = require('rewire');
var controller = rewire('./clientConfig.controller.js');
var config = require('../../config/environment');

describe('Client Config Controller API', function() {

  var mocks;
  var revert;

  beforeEach(function(done) {
    mocks = {};
    revert = controller.__set__(mocks);
    done();
  });

  afterEach(function(done) {
    revert();
    done();
  });

  it('should provide environment config to the client', function(done) {
    var sentStatus, sentJson;
    var req, res = {
      status: function(code) {
        sentStatus = code;
        return {
          send: function(json) {
            sentJson = json;
          }
        };
      }
    };
    controller.index(req, res);
    sentStatus.should.equal(200);
    sentJson.env.should.equal(config.env);
    done();
  });

});
