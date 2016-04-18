'use strict';

/**
 * A simple wrapper around jwt-simple that uses the configured jwt secret key
 */

var config = require('../config/environment/index');
var jwt = require('jwt-simple');

function encode(data) {
  return jwt.encode(data, config.auth.jwt.secret);
}

function decode(token) {
  try {
    return jwt.decode(token, config.auth.jwt.secret);
  } catch(e) {
    return;
  }
}

module.exports = {
  encode: encode,
  decode: decode
};
