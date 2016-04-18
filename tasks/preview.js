'use strict';

/**
 * Preview the build app
 */

var gulp = require('gulp');
var open = require('gulp-open');

var config = require('../server/config/environment');

var openOpts = {
  uri: 'http://localhost:' + config.port,
  already: false
};

module.exports = function() {
  process.env.NODE_ENV = 'test';
  process.chdir('./dist/server'); //Need to run server from here so that newrelic can find its config file
  require('../dist/server/server');
  process.chdir('../..'); //Can go back to the original directory now
  return gulp.src('dist/client/index.html')
    .pipe(open(openOpts));
};
