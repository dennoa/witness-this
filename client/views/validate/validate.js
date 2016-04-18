'use strict';

angular.module('myStuff').config(function($stateProvider) {
  $stateProvider
    .state('validate', {
      url: '/validate',
      templateUrl: 'views/validate/validate.html',
      controller: 'ValidateCtrl'
    });
});
