'use strict';

/**
 * Sets up satellizer for OAuth
 */
angular.module('myStuff').config(function($authProvider) {

  function stateToAvoidCsrf() {
    var rand = Math.random().toString(36).substr(2);
    return encodeURIComponent(rand);
  }

  $authProvider.google({
    clientId: 'CLIENT_ID',
    optionalUrlParams: ['display', 'state'],
    state: stateToAvoidCsrf
  });
  $authProvider.github({
    clientId: 'CLIENT_ID',
    optionalUrlParams: ['scope', 'state'],
    state: stateToAvoidCsrf
  });
  $authProvider.linkedin({
    clientId: 'CLIENT_ID',
    state: stateToAvoidCsrf
  });
  $authProvider.facebook({
    clientId: 'CLIENT_ID',
    optionalUrlParams: ['state'],
    state: stateToAvoidCsrf
  });

}).run(function($http, toUrl, SatellizerConfig) {
  //Set the authorization endpoint from the google discovery document rather than hard-coding it. Should be a better way...
  $http.get(toUrl('/auth/google/discoveryDocument')).success(function(doc) {
    SatellizerConfig.providers.google.authorizationEndpoint = doc.authorization_endpoint;
  });
});
