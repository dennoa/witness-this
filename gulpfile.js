'use strict';

var gulp = require('gulp');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

gulp.task('default', ['serve']);
gulp.task('serve', ['injectJs','injectScss','copyFonts','watch'], require('./tasks/serve').nodemon);
gulp.task('injectJs', require('./tasks/injectJs'));
gulp.task('injectScss', require('./tasks/injectScss'));
gulp.task('copyFonts', require('./tasks/copyFonts'));
gulp.task('sass', require('./tasks/sass'));
gulp.task('watch', require('./tasks/watch'));
gulp.task('inject', ['injectJs', 'injectScss']);
gulp.task('preview', ['build'], require('./tasks/preview'));
gulp.task('build', require('./tasks/build'));
gulp.task('bump', ['version'], require('./tasks/chore').bump);
gulp.task('version', require('./tasks/chore').version);
gulp.task('control', require('./tasks/control'));
gulp.task('test', require('./tasks/test').test);
gulp.task('tdd', require('./tasks/test').tdd);
