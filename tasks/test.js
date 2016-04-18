'use strict';

/**
 * Test tasks
 */

var gulp = require('gulp');
var chalk = require('chalk');
var KarmaServer = require('karma').Server;
var plumber = require('gulp-plumber');
var mocha = require('gulp-mocha');
var watch = require('gulp-watch');

/**
 * Log. With options.
 *
 * @param {String} msg
 * @param {Object} options
 */
function log(msg, options) {
  options = options || {};
  console.log(
    (options.padding ? '\n' : '')
    + chalk.yellow(' > ' + msg)
    + (options.padding ? '\n' : '')
  );
}

function runServerTests(done) {
  gulp.src('server/**/*.spec.js', {read: false})
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec'}))
    .once('error', function(err) {
      done(err);
    })
    .once('end', function() {
      done();
    });
}

function testServer(done) {
  log('Running server tests...', {padding: true});
  runServerTests(done);
}

function runClientTests(done) {
  new KarmaServer({
    configFile: __dirname + '/../karma.conf.js'
  }, done).start();
}

function testClient(done) {
  log('Running client tests...', {padding: true});
  runClientTests(done);
}

function test(done) {
  process.env.TDD = 'false';
  var arg = process.argv[3];
  if (!arg) {
    return testClient(function(err) {
      if (err) {
        return done(err);
      }
      testServer(function(err) {
        done(err);
        process.exit(err);
      });
    });
  }
  if (arg === '--server') {
    return testServer(function(err) {
      done(err);
      process.exit(err);
    });
  }
  return testClient(done);
}

function tdd(done) {
  var arg = process.argv[3] || '--server';
  if (arg === '--server') {
    return runServerTests(function() {
      watch(['server/**/*.js'], {read: false}, function(vinyl) {
        var path = vinyl.path;
        var specPath = (path.lastIndexOf('.spec.js') === (path.length - 8)) ? path : path.substring(0, path.length - 3) + '.spec.js';
        gulp.src(specPath, {read: false}).pipe(mocha({reporter: 'spec'}));
      });
    });
  }
  process.env.TDD = 'true';
  runClientTests(done);
}

module.exports = {
  test: test,
  tdd: tdd
};
