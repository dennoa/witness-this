'use strict';

var config = require('./environment');

/* This is a regex identifying the supported domains for cross-origin resource sharing requests.
 * Change this as required to add / remove support for specific domains.
 * The regex matches against the origin host name.
 */
var supportedHostnames = config.cors.supportedHostnames;

function getHostname(origin) {
  if (origin) {
    var start = origin.indexOf('://');
    if (start > 0) {
      start += 3;
      var end = origin.indexOf(':', start);
      if (end < 0) { end = origin.indexOf('/', start); }
      if (end < 0) { end = origin.length; }
      return origin.substring(start, end);
    }
  }
  return '';
}

function isSupported(origin) {
  return supportedHostnames && !!getHostname(origin).match(supportedHostnames);
}

module.exports = {
  origin: function(origin, cb) {
    cb(null, isSupported(origin));
  }
};
