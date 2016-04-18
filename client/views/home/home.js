'use strict';

angular.module('myStuff').config(function($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home/home.html',
      controller: 'HomeCtrl'
    });
});
