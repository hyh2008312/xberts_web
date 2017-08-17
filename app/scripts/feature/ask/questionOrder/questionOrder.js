angular.module('xbertsApp')
  .directive('questionOrder',['$rootScope',function ($rootScope) {
    return {
      restrict: 'E',
      scope: {
        askCtrl: '=',
        index: '='
      },
      templateUrl: 'scripts/feature/ask/questionOrder/question-order.html',
      link: function (scope, element, attrs, ctrls) {
        scope.orderList = ['latest','need help','popular','pending'];

        scope.changeOrder = function(index) {
          scope.index = index;
          scope.askCtrl.changeOrder(scope.index);
        };

        scope.user = $rootScope.user;
      }
    }
  }]);
