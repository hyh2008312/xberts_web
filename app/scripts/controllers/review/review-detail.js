'use strict';

angular.module('xbertsApp')
  .controller('ReviewDetailCtrl', ['$rootScope', '$scope', '$location', '$state', '$stateParams', '$uibModal', 'review',
    'ShopifyService', 'AnalyticsService', 'Applicantsreview', 'reportPaginator',
    function ($rootScope, $scope, $location, $state, $stateParams, $uibModal, review,
              ShopifyService, AnalyticsService, Applicantsreview, reportPaginator) {
      $scope.review = review;
      $scope.reportPaginator = reportPaginator;

      $scope.applicant = {exist: false, isSelected: false, isSubmitReport: false};

      $scope.applicantsSearch = {isSelected: true, isExempted: false};

      $scope.percentage = function () {
        var decimal = ($scope.review.flashsale.totalUnits - $scope.review.flashsale.availableUnits) / $scope.review.flashsale.totalUnits;
        return Math.round(decimal * 100);
      };

      if ($rootScope.user.isAuth()) {
        Applicantsreview.get({
          review_id: $scope.review.id,
          reviewer_id: $rootScope.user.getUserId()
        }, function (data) {
          if (data.count !== undefined && data.count > 0) {
            angular.extend($scope.applicant, data.results[0]);
            $scope.applicant.exist = true;
          }
        }, function () {

        })
      }

      var project = review.project;
      var title = project.title;
      var description = project.description;
      var backgroundColor = 'background-bg-light';
      var shareImage = review.banner;
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);

      $scope.tabs = [
        {title: 'detail', active: true},
        {title: 'comments', active: false},
        {title: 'reviews', active: false}
      ];
      $scope.tabActive = 0;

      var search = $location.search();
      var tab = search.tab || 'detail';
      switch (tab) {
        case 'detail':
          $scope.tabActive = 0;
          break;
        case 'comments':
          $scope.tabActive = 1;
          break;
        case 'reviews':
          $scope.tabActive = 2;
          break;
        default:
          $scope.tabActive = 0;
      }
      $scope.commentsTabActive = false;
      $scope.reviewersTabActive = false;
      $scope.select = function (step) {
        $scope.commentsTabActive = false;
        $scope.reviewersTabActive = false;
        switch (step) {
          case 'comments':
            $scope.commentsTabActive = true;
            $scope.reviewersTabActive = false;
            break;
          case 'reviews':
            $scope.commentsTabActive = false;
            $scope.reviewersTabActive = true;
            break;
        }
      };

      $scope.isCurrentUser = $rootScope.user.isAuth() && $rootScope.user.getUserId() === $scope.review.project.account.id;

      var sendMessage = function () {
        if (!$rootScope.user.authRequired()) {
          return;
        }

        var sendMessageModal = $uibModal.open({
          templateUrl: 'views/modal/send-message.html',
          windowClass: 'dialog-vertical-center',
          controller: 'SendMessageCtrl',
          resolve: {
            recipientId: function () {
              return $scope.review.project.account.id;
            }
          }
        });
      };

      $scope.contactUser = function () {
        sendMessage();
      };


      var buyProduct = function () {
        if (!$rootScope.user.authRequired()) {
          return;
        }

        $location.search('action', null);

        $scope.$emit('backdropOn', 'buy');

        ShopifyService.buy(review.flashsale.id, review.flashsale.shopGatewayInventoryId, $rootScope.user, 1)
          .then(function () {
            AnalyticsService.sendPageView($location.path() + '/buy');

            // Show spinner until purchase flow redirect
          })
          .catch(function () {
            $scope.$emit('backdropOff', 'buyFailed');
          });
      };

      $scope.buyClicked = function () {
        $state.go('application.campaign', {reviewId: review.id, action: 'buy'});

        buyProduct();
      };

      if ($stateParams.action === 'buy' && $rootScope.user.authRequired()) {
        buyProduct();
      }


    }]);
