'use strict';

/**
 * If you want to have a RESTful API but your server is behind TAM then you can't do PUTs or DELETEs.
 * This interceptor translates DELETEs into GETs and PUTs into POSTs.
 * The method-override express middleware used by the server translates the http methods back again before the request is routed for handling.
 */
angular.module('myStuff').config(function($httpProvider) {

  $httpProvider.interceptors.push('httpMethodOverride');

}).factory('httpMethodOverride', function() {

  var overrides = {
    'DELETE': 'GET',
    'PUT': 'POST'
  };

  return {
    request: function(config) {
      var overrideMethod = overrides[config.method];
      if (overrideMethod) {
        config.headers['X-HTTP-Method-Override'] = config.method;
        config.method = overrideMethod;
      }
      return config;
    }
  };
});
