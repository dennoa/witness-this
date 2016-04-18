'use strict';

var path = require('path');
var _ = require('lodash');
var env = process.env.NODE_ENV || 'development';

var all = {

  env: env,
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.PORT || 9000,

  mongo: {
    uri: 'mongodb://uldcop002/my-stuff-' + env,
    options: {
      db: {
        safe: true
      }
    }
  },

  cors: {
    supportedHostnames: /(copperapp|rancherapp|\.copper\.pub|\.auiag\.corp|\.iaglimited\.net|\.iag\.com\.au|\.cgu\.com\.au|\.edgeapp\.io)/
  },

  auth: {
    jwt: {
      secret: 'M3anS33dJwtS3cr3t'
    },
    google: {
      discoveryDocumentUrl: 'https://accounts.google.com/.well-known/openid-configuration',
      clientSecret: 'CLIENT_SECRET'
    },
    github: {
      tokenEndpoint: 'https://github.com/login/oauth/access_token',
      userInfoEndpoint: 'https://api.github.com/user',
      clientSecret: 'CLIENT_SECRET'
    },
    linkedin: {
      tokenEndpoint: 'https://www.linkedin.com/uas/oauth2/accessToken',
      userInfoEndpoint: 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address,picture-url)?format=json',
      clientSecret: 'CLIENT_SECRET'
    },
    facebook: {
      tokenEndpoint: 'https://graph.facebook.com/v2.5/oauth/access_token',
      userInfoEndpoint: 'https://graph.facebook.com/v2.5/me?fields=id,email,first_name,last_name,link,name',
      clientSecret: 'CLIENT_SECRET'
    }
  },

  proxy: null

};

module.exports = _.merge(all, require('./' + all.env + '.js'));
