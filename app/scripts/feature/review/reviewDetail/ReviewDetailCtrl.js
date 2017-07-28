'use strict';

angular.module('xbertsApp')
  .controller('ReviewDetailCtrl',['$scope', '$rootScope', '$stateParams', 'report', 'ReviewReport', 'growl', 'InviteService',
    'ExpertService','blogPaginator',
    function ($scope, $rootScope, $stateParams, report, ReviewReport, growl, InviteService,ExpertService,blogPaginator) {
      $scope.report = report;

      $scope.expert = {
        userId: report.getReviewerId()
      };

      $scope.blogPaginator = blogPaginator;

      ExpertService.getAchievement(report.getReviewerId()).then(function(data) {
        $scope.achievement = data;
      });

      var title = report.title;
      var description = report.description;
      var backgroundColor = 'background-bg-white';
      var shareImage = report.image;
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);

      // FAB Speed Dial Component
      // Set the component to the normal state
      $scope.hidden = false;
      $scope.isOpen = false;
      $scope.hover = false;
      $scope.shareList = [
        { name: "facebook" },
        { name: "twitter"},
        { name: "linkedin"}
      ];

      $scope.inviteObj = angular.copy(InviteService, {});

      $scope.commentToggle = false;

      $scope.onToggleDown = function() {
        $scope.commentToggle = !$scope.commentToggle;
      };



    }]);
