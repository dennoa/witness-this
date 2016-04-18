'use strict';

/**
 * API calls need to navigate the proxy servers in front of our apps.
 * Wrap this function around your api urls to ensure they use the full path.
 */
angular.module('myStuff').factory('toUrl', function($location) {

  function getServerCtxRootIdx(absUrl) {
    return absUrl.indexOf('/', absUrl.indexOf('//') + 2);
  }

  function getHashIdx(absUrl, rootIdx) {
    var hashIdx = absUrl.indexOf('#', rootIdx);
    if (hashIdx > rootIdx) {
      return absUrl.lastIndexOf('/', hashIdx);
    }
    return absUrl.lastIndexOf('/');
  }

  function getBaseUrl() {
    var absUrl = $location.absUrl();
    var rootIdx = getServerCtxRootIdx(absUrl);
    var hashIdx = getHashIdx(absUrl, rootIdx);
    return (hashIdx <= rootIdx) ? '' : absUrl.substring(rootIdx, hashIdx);
  }

  var baseUrl = getBaseUrl();

  return function(path) {
    return baseUrl + path;
  };
});
