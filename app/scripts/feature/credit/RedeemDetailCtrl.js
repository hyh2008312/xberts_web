'use strict';

angular.module('xbertsApp')
  .controller('RedeemDetailCtrl', ['$rootScope', '$scope', '$state', '$mdDialog', '$mdToast', 'redeemDetail', 'moment',
    function($rootScope, $scope, $state, $mdDialog, $mdToast, redeemDetail, moment) {
    var redeemCtrl = this;
    redeemCtrl.redeemDetail = redeemDetail;

    redeemCtrl.toggle = false;

    redeemCtrl.showDescription = function() {
      redeemCtrl.toggle = !redeemCtrl.toggle;
    };
    var endTime = moment(redeemCtrl.redeemDetail.dateEnded);
    var now = moment();
    $scope.showButton = endTime.diff(now, 'seconds');

    redeemCtrl.redeem = function(ev) {
      if(!$rootScope.user.authRequired()) {
        return;
      }

      if($rootScope.user._points - $rootScope.user._consumed < redeemCtrl.redeemDetail.points) {
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('.xb-body-view')))
            .clickOutsideToClose(true)
            .textContent("Oops! You don't have enough points to redeem this gift. Earn more points now!")
            .ariaLabel('Alert Dialog')
            .ok('ok')
            .targetEvent(ev)
        );
      } else {
        $state.go('application.shippingAddress', {giftId: redeemCtrl.redeemDetail.id,giftPoints:redeemCtrl.redeemDetail.points});
      }

    };
    redeemCtrl.redeemMobile = function(ev) {
      if(!$rootScope.user.authRequired()) {
        return;
      }
      if($rootScope.user._points - $rootScope.user._consumed < redeemCtrl.redeemDetail.points) {
        $mdToast.show({
          hideDelay: 3000,
          position: 'bottom',
          controller: function(scope, $mdToast) {
            scope.cancel = function() {
              $mdToast.cancel();
            };
          },
          toastClass:'xb-redeem-detail__toast',
          templateUrl: 'scripts/feature/credit/redeemToast/redeem-toast.html'
        });
      } else {
        $state.go('application.shippingAddress', {giftId: redeemCtrl.redeemDetail.id,giftPoints:redeemCtrl.redeemDetail.points});
      }
    };

    var title = redeemDetail.name;
    var description = redeemDetail.description;
    var backgroundColor = 'background-bg-light';
    var shareImage = redeemDetail.getImageOriginal();
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);

  }]);



