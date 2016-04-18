'use strict';

var router = require('express').Router();
var _ = require('lodash');


/* See https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md for details of the swaggerMiddleware object schema.
 * The intent here is that we can split the swaggerMiddleware configuration into the various functional areas and just include them here in the main file.
 */
var apiDocs = _.merge(
  {
    "swagger": "2.0",
    "info": {
      "title": "My Stuff",
      "description": "Seed project for MEAN stack apps",
      "version": "1.0"
    },
    "basePath": "/api",
    "consumes": ["application/json"],
    "produces": ["application/json"],
    "tags": [
      { "name": "clientConfig", "description": "Client configuration" }
    ]
  },
  require('./api/clientConfig/swagger')
);


router.get('/', function(req, res) {
  res.status(200).send(apiDocs);
});

module.exports = router;
