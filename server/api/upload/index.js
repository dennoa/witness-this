'use strict';

var express = require('express');
var upload = require('./upload');
var router = express.Router();

router.post('/', upload);

module.exports = router;
