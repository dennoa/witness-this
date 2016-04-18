'use strict';

describe('Client Config', function () {

  var $httpBackend;

  beforeEach(module('myStuff'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    commonBeforeEach($httpBackend);
  }));

  afterEach(function() {
    commonAfterEach($httpBackend);
  });

  it('should use the server api to get the client config', inject(function(clientConfig) {
    var config = {
      someConfig: {
        data: 'hi'
      }
    };
    var result = null;
    $httpBackend.expectGET('/api/clientConfig').respond(200, config);
    clientConfig.then(function(cfg) {
      result = cfg;
    });
    $httpBackend.flush();
    expect(result).toEqual(config);
  }));

  it('should pass errors to the caller unchanged', inject(function(clientConfig) {
    var error = {
      status: 500,
      data: 'Failed'
    };
    var result = null;
    $httpBackend.expectGET('/api/clientConfig').respond(error.status, error.data);
    clientConfig.then(function() {
    }, function(err) {
      result = err;
    });
    $httpBackend.flush();
    expect(result.status).toEqual(error.status);
    expect(result.data).toEqual(error.data);
  }));

});
