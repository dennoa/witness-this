'use strict';

var config = require('../../config/environment/index');
var request = require('request');
var _ = require('lodash');

function tokenParams(commonTokenParams) {
  return _.merge(commonTokenParams, {
    client_secret: config.auth.linkedin.clientSecret
  });
}

function lookupToken(commonTokenParams) {
  return new Promise(function(resolve, reject) {
    request.post({ url: config.auth.linkedin.tokenEndpoint, form: tokenParams(commonTokenParams), json: true, proxy: config.proxy }, function(err, res, token) {
      if (err) { return reject(err); }
      if (token.error) { return reject(token); }
      resolve(token);
    });
  });
}

function toStandardUserInfo(userInfo) {
  return {
    email: userInfo.emailAddress,
    name: userInfo.firstName + ' ' + userInfo.lastName,
    picture: userInfo.pictureUrl
  };
}

function retrieveUserInfo(token, cb) {
  request.get({ url: config.auth.linkedin.userInfoEndpoint, headers: {Authorization: 'Bearer ' + token.access_token}, json: true, proxy: config.proxy }, function(err, res, userInfo) {
    if (err) { return cb(err); }
    if (userInfo.error) { return cb(userInfo); }
    cb(null, toStandardUserInfo(userInfo));
  });
}

function auth(commonTokenParams, cb) {
  lookupToken(commonTokenParams).then(function(token) {
    retrieveUserInfo(token, cb);
  }, cb);
}

module.exports = auth;
