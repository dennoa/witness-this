'use strict';

var filesToInject = require('./tasks/config/filesToInject');

module.exports = function(config) {

  config.set({

    frameworks: ['jasmine'],

    preprocessors: {
      '**/*.html': ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
      cacheIdFromPath: function(filepath) {
        if (filepath.substring(0,7) === 'client/') {
          return filepath.substring(7);
        }
        if (filepath.substring(0,13) === 'node_modules/') {
          return filepath.substring(13);
        }
        return filepath;
      },
      moduleName: 'templates'
    },

    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor'
    ],

    files: filesToInject.nodeModulesJs.concat([
      'node_modules/angular-mocks/angular-mocks.js',
      'client/app.js',
      'client/app.spec.js',
      'client/directives/**/*.js',
      'client/directives/**/*.html',
      'client/filters/**/*.js',
      'client/services/**/*.js',
      'client/views/**/*.js',
      'client/views/**/*.html'
    ]),

    exclude: [
      'client/views/**/*.e2e.js'
    ],

    reporters: ['progress'],

    port: 9876,

    colors: true,

    // possible values:
    // config.LOG_DISABLE
    // config.LOG_ERROR
    // config.LOG_WARN
    // config.LOG_INFO
    // config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    autoWatch: (process.env.TDD === 'true'),

    browsers: ['PhantomJS'],

    singleRun: (process.env.TDD !== 'true')
  });
};
