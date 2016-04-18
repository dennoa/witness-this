'use strict';

angular.module('myStuff').controller('ValidateCtrl', function($scope, Upload, toUrl, $timeout) {

  $scope.data = {};
  $scope.progress = 0;
  $scope.progressWidth = null;
  $scope.isWaitingForServer = false;

  $scope.uploadFiles = function(files) {
    if (files && files.length) {
      $scope.isWaitingForServer = true;
      Upload.upload({url: toUrl('/api/validate'), data: {file: files}}).then(function(resp) {
        $scope.data = resp.data;
        $scope.isWaitingForServer = false;
      }, function(resp) {
        console.log(resp);
      }, function(evt) {
        $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        $scope.progressWidth = 'width: ' + $scope.progress + '%';
        console.log('progress: ' + $scope.progress + '% file :' + evt.config.data.file.name);
      });
    }
  };
  
  $scope.$watch('progress', function(newValue) {
    if (newValue === 100) {
      $timeout(function() {
        $scope.progress = 0;
        $scope.progressWidth = null;
      }, 2000);
    }
  });
  
});
