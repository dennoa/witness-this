'use strict';

angular.module('myStuff').config(function($stateProvider) {
  $stateProvider
    .state('howitworks', {
      url: '/howitworks',
      templateUrl: 'views/howitworks/how.html',
      controller: 'HowCtrl'
    });
});
