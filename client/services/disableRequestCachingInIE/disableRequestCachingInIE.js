'use strict';

/**
 * IE specific hack to get around caching issues.
 */
angular.module('myStuff').config(function($httpProvider) {

  angular.forEach(['get', 'post', 'put', 'delete'], function(method) {
    if (!$httpProvider.defaults.headers[method]) {
      $httpProvider.defaults.headers[method] = {};
    }
    $httpProvider.defaults.headers[method]['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    angular.forEach(['Cache-Control', 'Pragma'], function(noCacheName) {
      $httpProvider.defaults.headers[method][noCacheName] = 'no-cache';
    });
  });
});
