'use strict';
angular.module('xbertsApp')
  .controller('ShareController', ['$scope','$uibModalInstance','socialContent', function ($scope,$uibModalInstance,socialContent) {

    $scope.ok = function () {
      $uibModalInstance.close('YES');
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('NO');
    };

    $scope.socialContent=socialContent;

  }])
  .factory('XBSocialShare', ['$uibModal','$state', function ($uibModal) {

    var open = function (size,socialContent) {

      var modalInstance = $uibModal.open({
        templateUrl: 'views/modal/share.html',
        controller: 'ShareController',
        windowClass: 'dialog-vertical-center',
        size: size,
        resolve: {
          socialContent:socialContent
        }
      });
      modalInstance.result.then(function (result) {
        //$state.go(redirectState,redirectStateParam);
      }, function (value) {
        console.info('Modal closed: ' + value);
      });
    };

    return {
      open:open
    }
  }]);
