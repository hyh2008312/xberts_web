/**
 * Created by zyd on 16/6/7.
 */
'use strict';

angular.module('xbertsApp')
  .controller('LeavePromptController', ['$scope', '$uibModalInstance', 'title',
    function ($scope, $uibModalInstance, title) {
      $scope.title = title;
      $scope.ok = function () {
        $uibModalInstance.close('YES');
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('NO');
      };
    }]);
