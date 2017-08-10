angular.module('xbertsApp')
  .directive('dealsListMain', ['DealsService','$mdDialog','DealsFactory','$state','$rootScope',
    function (DealsService,$mdDialog,DealsFactory,$state,$rootScope) {
      return {
        restrict: 'E',
        scope: {
          deals: '='
        },
        templateUrl: 'scripts/feature/deals/dealsListMain/deals-list-main.html',
        link: function (scope, element, attrs, ctrls) {
          scope.deals = scope.deals || [];

          scope.headImage = DealsService.headImage;

          scope.page = 0;

          scope.openMobileDialog = function(id) {

            $mdDialog.show({
              controller: function(scope, $mdDialog) {

                if( DealsFactory.signupPicture == null) {
                  DealsFactory.signupPicture = DealsFactory.signupPictureList[Math.floor(Math.random() * 4)];
                }

                scope.image = DealsFactory.signupPicture;

                scope.cancel = function() {
                  $mdDialog.cancel();
                  $state.go('application.dealsDetail',{dealsId:id});
                };

                scope.signup = function() {
                  if(!$rootScope.user.authRequired(true)) {
                    return;
                  }
                };
              },
              templateUrl: 'scripts/feature/deals/dealsDialog/deals-dialog.html',
              parent: angular.element(document.body),
              clickOutsideToClose: false,
              disableParenScroll: true
            });
          }
        }
      }
    }]);