'use strict';

describe('Auth', function () {

  var $httpBackend;

  beforeEach(module('myStuff'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    commonBeforeEach($httpBackend);
    $httpBackend.flush();
  }));

  afterEach(function() {
    commonAfterEach($httpBackend);
  });

  it('should set the google client id', inject(function(SatellizerConfig) {
    expect(SatellizerConfig.providers.google.clientId).toBeDefined();
  }));

  it('should include the state parameter to combat CSRF attacks for google auths', inject(function(SatellizerConfig) {
    expect(SatellizerConfig.providers.google.optionalUrlParams.indexOf('state')).toBeGreaterThan(-1);
    expect(SatellizerConfig.providers.google.state()).toBeDefined();
  }));

  it('should set the google authorization endpoint from the google discovery document', inject(function(SatellizerConfig) {
    expect(SatellizerConfig.providers.google.authorizationEndpoint).toEqual('https://accounts.google.com/o/oauth2/v2/auth');
  }));

  it('should set the github client id', inject(function(SatellizerConfig) {
    expect(SatellizerConfig.providers.github.clientId).toBeDefined();
  }));

  it('should include the state parameter to combat CSRF attacks for github auths', inject(function(SatellizerConfig) {
    expect(SatellizerConfig.providers.github.optionalUrlParams.indexOf('state')).toBeGreaterThan(-1);
    expect(SatellizerConfig.providers.github.state()).toBeDefined();
  }));

  it('should set the linkedin client id', inject(function(SatellizerConfig) {
    expect(SatellizerConfig.providers.linkedin.clientId).toBeDefined();
  }));

  it('should include the state parameter to combat CSRF attacks for linkedin auths', inject(function(SatellizerConfig) {
    expect(SatellizerConfig.providers.linkedin.requiredUrlParams.indexOf('state')).toBeGreaterThan(-1);
    expect(SatellizerConfig.providers.linkedin.state()).toBeDefined();
  }));

  it('should set the facebook client id', inject(function(SatellizerConfig) {
    expect(SatellizerConfig.providers.facebook.clientId).toBeDefined();
  }));

  it('should include the state parameter to combat CSRF attacks for facebook auths', inject(function(SatellizerConfig) {
    expect(SatellizerConfig.providers.facebook.optionalUrlParams.indexOf('state')).toBeGreaterThan(-1);
    expect(SatellizerConfig.providers.facebook.state()).toBeDefined();
  }));

});
