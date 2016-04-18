'use strict';

/**
 * Inject css/js files in index.html
 */

var gulp = require('gulp');
var inject = require('gulp-inject');
var filesToInject = require('./config/filesToInject');

module.exports = function() {
  return gulp.src('styles/app.scss', {cwd: 'client'})
    .pipe(inject(gulp.src(filesToInject.clientScss, {read: false, cwd: 'client'}), {
      relative: 'true'
    }))
    .pipe(gulp.dest('client/styles'));
};
