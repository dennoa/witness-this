'use strict';

/* Swagger schema for the clientConfig api */

module.exports = {
  "paths": {
    "/clientConfig": {
      "get": {
        "tags": ["clientConfig"],
        "summary": "Get client configuration",
        "description": "Returns configuration relevant to the client",
        "responses": {
          "200": {
            "description": "A configuration object",
            "schema": {
              "$ref": "#/definitions/clientConfig"
            }
          }
        }
      }
    }
  },
  "definitions": {
    "clientConfig": {
      "type": "object",
      "properties": {
        "env": {
          "type": "string"
        }
      }
    }
  }
};
