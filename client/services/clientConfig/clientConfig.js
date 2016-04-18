'use strict';

/**
 * Loads environment-specific configuration that is relevant to the client.
 * This can help with feature-toggling by allowing different on/off settings in different environments.
 */
angular.module('myStuff').factory('clientConfig', function($http, toUrl, $q) {

  return $q(function(resolve, reject) {
    $http.get(toUrl('/api/clientConfig')).then(function(success) {
      resolve(success.data);
    }, function(error) {
      reject(error);
    });
  });
});
