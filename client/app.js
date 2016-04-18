'use strict';

angular.module('myStuff', [
  'ngFileUpload',
  'satellizer',
  'ui.router'

]).config(function($urlRouterProvider, $locationProvider, $authProvider) {
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(false);
});
