angular.module('xbertsApp')
  .directive('xbFollow', ['$rootScope','ExpertService','localStorageService',
    function($rootScope,ExpertService,localStorageService) {
    return {
      restrict: 'E',
      scope: {
        follow: '=',
        userId: '=',
        experts: '=',
        index: '=',
        following:'=',
        achievement: '=',
        expert: '='
      },
      templateUrl: 'scripts/feature/profile/xbFollow/xb-follow.html',
      link: function (scope, element, attrs, ctrls) {

        scope.disabled = false;
        scope.isCurrentUser = $rootScope.user.isAuth() && $rootScope.user.getUserId() === scope.userId;
        scope.addFollow = function () {
          if (!$rootScope.user.authRequired()) {
            return;
          }
          scope.disabled = true;
          ExpertService.follow({id:scope.userId}).then(function(data) {
            scope.disabled = false;

            var followeeList = $rootScope.user.getFollowees();

            if(data.follow) {
              followeeList.unshift(scope.userId);
              $rootScope.user.setFollowedQuestions(followeeList);
            } else {
              var index = 0;
              angular.forEach(followeeList, function(e,i) {
                if(e == scope.userId) {
                  index = i;
                }
              });
              followeeList.splice(index,1);
              $rootScope.user.setFollowedQuestions(followeeList);
            }

            if(data.follow == false && scope.achievement && $rootScope.user.getUserId() === scope.expert.userId) {
              scope.achievement.followeesAmount--;
            }
            if(data.follow == true && scope.achievement && $rootScope.user.getUserId() === scope.expert.userId) {
              scope.achievement.followeesAmount++;
            }
            if(data.follow == false && scope.achievement && $rootScope.user.getUserId() != scope.expert.userId
              && scope.userId == scope.expert.userId) {
              scope.achievement.followersAmount--;
            }
            if(data.follow == true && scope.achievement && $rootScope.user.getUserId() != scope.expert.userId
              && scope.userId == scope.expert.userId) {
              scope.achievement.followersAmount++;
            }
            if(scope.expert && $rootScope.user.getUserId() === scope.expert.userId) {
              scope.expert.reload = true;
            }
            if(data.follow == false && scope.following == true && $rootScope.user.getUserId() === scope.expert.userId) {
              scope.experts.splice(scope.index,1);
              return false;
            }
            scope.follow = data.follow;

            localStorageService.clearAll();
          }, function() {

          });
        };

      }
    }
  }]);
