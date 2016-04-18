'use strict';

/**
 * Watch files, and do things when they changes.
 * Recompile scss if needed.
 * Reinject files
 */

var gulp = require('gulp');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var filesToInject = require('./config/filesToInject');

module.exports = function(allDone) {

  watch(['client/styles/app.scss', 'client/views/**/*.scss', 'client/directives/**/*.scss'], {events: ['change']}, batch(function(events, done) {
    gulp.start('sass', done);
  }));

  watch(filesToInject.clientJs, {events: ['add', 'unlink']}, batch(function(events, done) {
    gulp.start('injectJs', done);
  }));

  watch(['client/views/**/*.scss', 'client/directives/**/*.scss'], {events: ['add', 'unlink']}, batch(function(events, done) {
    gulp.start('injectScss', done);
  }));

  livereload.listen();

  watch([
    'client/index.html',
    'client/views/**/*.html',
    'client/directives/**/*.html',
    'client/styles/css/app.css'
  ].concat(filesToInject.clientJs), livereload.changed);

  allDone();
};
