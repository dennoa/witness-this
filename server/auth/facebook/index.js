'use strict';

var config = require('../../config/environment/index');
var request = require('request');
var _ = require('lodash');

function tokenParams(commonTokenParams) {
  return _.merge(commonTokenParams, {
    client_secret: config.auth.facebook.clientSecret
  });
}

function lookupToken(commonTokenParams) {
  return new Promise(function(resolve, reject) {
    request.get({ url: config.auth.facebook.tokenEndpoint, qs: tokenParams(commonTokenParams), json: true, proxy: config.proxy }, function(err, res, token) {
      if (err) { return reject(err); }
      if (token.error) { return reject(token); }
      resolve(token);
    });
  });
}

function toStandardUserInfo(userInfo) {
  return {
    email: userInfo.email,
    name: userInfo.name,
    picture: 'https://graph.facebook.com/v2.5/' + userInfo.id + '/picture?type=large'
  };
}

function retrieveUserInfo(token, cb) {
  request.get({ url: config.auth.facebook.userInfoEndpoint, qs: token, json: true, proxy: config.proxy }, function(err, res, userInfo) {
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
