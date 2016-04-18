'use strict';

var config = require('../../config/environment');

function index(req, res) {
  res.status(200).send({
    env: config.env
  });
}

module.exports = {
  index: index
};
