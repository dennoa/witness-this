'use strict';

describe('Http Method Override', function () {

  beforeEach(module('myStuff'));

  it('should turn DELETE into GET', inject(function(httpMethodOverride) {
    var config = httpMethodOverride.request({ headers: {}, method: 'DELETE' });
    expect(config.headers['X-HTTP-Method-Override']).toEqual('DELETE');
    expect(config.method).toEqual('GET');
  }));

  it('should turn PUT into POST', inject(function(httpMethodOverride) {
    var config = httpMethodOverride.request({ headers: {}, method: 'PUT' });
    expect(config.headers['X-HTTP-Method-Override']).toEqual('PUT');
    expect(config.method).toEqual('POST');
  }));

});
