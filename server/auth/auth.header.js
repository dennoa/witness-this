'use strict';

var jwt = require('./jwt');

/**
 * @returns The decoded JSON Web Token provided on the request Authorization header
 */
module.exports = function(req) {
  var authHeader = req.get('Authorization');
  return (authHeader) ? jwt.decode(authHeader.split(' ')[1]) : null;
};
