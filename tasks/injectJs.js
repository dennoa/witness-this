'use strict';

/**
 * Inject css/js files in index.html
 */

var gulp = require('gulp');
var fileSort = require('gulp-angular-filesort');
var inject = require('gulp-inject');
var filesToInject = require('./config/filesToInject');

module.exports = function() {
  return gulp.src('client/index.html')
    .pipe(inject(gulp.src(filesToInject.nodeModulesJs), {name: 'nodemodules', read: false, ignorePath: 'node_modules', addRootSlash: false}))
    .pipe(inject(gulp.src(filesToInject.clientJs).pipe(fileSort()), {read: false, relative: true}))
    .pipe(gulp.dest('client'));
};
