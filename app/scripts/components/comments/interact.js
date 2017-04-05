angular.module('xbertsApp')
  .directive('interact', ['InteractService', 'Interact', '$rootScope', '$q', function (InteractService, Interact, $rootScope, $q) {
    return {
      restrict: 'E',
      scope: {
        interact: '='
      },

      controller: function ($scope) {

        $scope.interact = Interact.build($scope.interact);

        $scope.currentJoin = {vote: false};

        var self = this;

        this.getCurrentJoin = function () {
          return $scope.currentJoin;
        };

        this.getInteract = function () {
          return $scope.interact;
        };

        this.setCurrentJoin = function (join) {
          angular.extend($scope.currentJoin, join);
        };

        this.getOrCreateCurrentJoin = function () {
          var delay = $q.defer();

          if (!$rootScope.user.authRequired()) {
            delay.reject('not login');
          } else {
            if ($scope.currentJoin.id) {
              delay.resolve($scope.currentJoin);
            } else {
              InteractService.createJoin({interact: $scope.interact.id}).then(function (join) {
                angular.extend($scope.currentJoin, join);
                delay.resolve($scope.currentJoin);
              });
            }
          }

          return delay.promise;
        };

        this.vote = function () {
          self.getOrCreateCurrentJoin().then(function () {
            var currentJoin = self.getCurrentJoin();
            var join = {id: currentJoin.id, vote: !currentJoin.vote};
            if (join.vote) {
              currentJoin.vote = true;
              $scope.interact.increaseVote();
            } else {
              currentJoin.vote = false;
              $scope.interact.reduceVote();
            }
            InteractService.vote(join);
          });
        };
      },
      controllerAs: 'interactCtrl',
      link: function (scope) {
        if ($rootScope.user.isAuth()) {
          InteractService.getJoin(scope.interact.id, $rootScope.user.getUserId()).then(function (join) {
            if (join) {
              angular.extend(scope.currentJoin, join);
            }
          });
        }
      }
    };
  }]);
