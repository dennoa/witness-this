'use strict';

var express = require('express');
var compression = require('compression');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');
var corsOptions = require('./corsOptions');
var config = require('./environment');

module.exports = function (app) {

  var env = config.env;

  app.set('view engine', 'html');
  app.use(cors(corsOptions));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(compression());
  app.use(morgan('dev', {
    skip: function(req, res) {
      return res.statusCode < 400;
    }
  }));
  app.use(express.static(path.join(config.root, 'client')));
  app.use(express.static(path.join(config.root, 'node_modules')));
  app.set('appPath', 'client');

  if (env !== 'production') {
    app.use(require('errorhandler')());
  }

};
