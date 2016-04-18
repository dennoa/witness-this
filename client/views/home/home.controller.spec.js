'use strict';

describe('Home Controller', function() {

  beforeEach(module('myStuff'));

  var HomeCtrl, scope;

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    HomeCtrl = $controller('HomeCtrl', {
      $scope: scope
    });
  }));

});
