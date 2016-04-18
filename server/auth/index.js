'use strict';

var express = require('express');
var authController = require('./auth.controller.js');
var facebook = require('./facebook');
var github = require('./github');
var google = require('./google');
var linkedin = require('./linkedin');
var router = express.Router();

router.get('/google/discoveryDocument', google.discoveryDocument);

router.post('/facebook', authController(facebook));
router.post('/github', authController(github));
router.post('/google', authController(google.auth));
router.post('/linkedin', authController(linkedin));

module.exports = router;
