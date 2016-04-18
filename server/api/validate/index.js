'use strict';

var express = require('express');
var validate = require('./validate');
var router = express.Router();

router.post('/', validate);

module.exports = router;
