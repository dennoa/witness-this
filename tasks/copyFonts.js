'use strict';

/**
 * Copy fonts from node_modules into client/assets/fonts
 */

var gulp = require('gulp');

module.exports = function() {
  return gulp.src('node_modules/font-awesome/fonts/*.*')
    .pipe(gulp.dest('client/assets/fonts'));
  };
