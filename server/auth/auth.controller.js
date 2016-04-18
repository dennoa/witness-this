'use strict';

var jwt = require('./jwt');

function commonTokenParams(clientParams) {
  return {
    code: clientParams.code,
    client_id: clientParams.clientId,
    redirect_uri: clientParams.redirectUri,
    grant_type: 'authorization_code'
  };
}

/**
 * All OAuth providers perform the required steps to verify the user and retrieve their basic information
 * @param providerHandler The handler for a particular OAuth provider such as google, facebook, linkedin, etc...
 */
function auth(providerHandler) {
  return function(req, res) {
    providerHandler(commonTokenParams(req.body), function(err, userInfo) {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).json({
        token: jwt.encode(userInfo)
      });
    });
  };
};

module.exports = auth;
