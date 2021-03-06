angular.module('xbertsApp')
  .directive('answerItem',['$rootScope','ExpertService','$mdDialog','AskService','$mdToast',
    function($rootScope,ExpertService,$mdDialog,AskService,$mdToast) {
    return {
      restrict: 'E',
      scope: {
        answers: '=',
        admin: '='
      },
      templateUrl: 'scripts/feature/ask/answerItem/answer-item.html',
      link: function (scope, element, attrs, ctrls) {
        scope.user = $rootScope.user;

        scope.onToggleDown = function(answer) {
          answer.commentToggle = !answer.commentToggle;
        };

        scope.addFollow = function (answer) {
          if (!$rootScope.user.authRequired()) {
            return;
          }
          answer.disabled = true;
          ExpertService.follow({id:answer.getAnswerUserId()}).then(function(data) {
            angular.forEach(scope.answers,function(e,i) {
              if(e.getAnswerUserId() == answer.getAnswerUserId()) {
                e.owner.currentUser.follow = data.follow;
              }
            });
            answer.disabled = false;
            answer.owner.currentUser.follow = data.follow;

            var followeeList = $rootScope.user.getFollowees();

            if(data.follow) {
              followeeList.unshift(answer.getAnswerUserId());
              $rootScope.user.setFollowedQuestions(followeeList);
            } else {
              var index = 0;
              angular.forEach(followeeList, function(e,i) {
                if(e == answer.getAnswerUserId()) {
                  index = i;
                }
              });
              followeeList.splice(index,1);
              $rootScope.user.setFollowedQuestions(followeeList);
            }

          }, function() {

          });
        };

        scope.showMenu = function(answer) {
          answer.showMenu = !answer.showMenu;
        };

        scope.report = function(id, ev) {
          if (!$rootScope.user.authRequired()) {
            return;
          }
          $mdDialog.show({
            controller: function(scope, $mdDialog) {
              scope.cancel = function() {
                $mdDialog.cancel();
              };
              scope.disabled = false;
              scope.report = function() {
                if (!scope.reportForm.$valid) {
                  return;
                }
                scope.disabled = true;
                AskService.report({reason: scope.reason == 'Other'? scope.other:scope.reason,id:id})
                  .then(function() {
                    scope.disabled = false;
                    scope.cancel();
                    $mdToast.show({
                      hideDelay: 3000,
                      position: 'top',
                      toastClass:'xb-ask-dialog__toast',
                      templateUrl: 'scripts/feature/ask/answerItem/report-toast.html'
                    });
                  });
              };
            },
            templateUrl: 'scripts/feature/ask/answerItem/report.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            disableParenScroll: true
          });
        };

        scope.seletedAsTopAnswer = function(answer) {
          AskService.updateAnswer(answer).then(function(data) {});
        };

        scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
          //you also get the actual event object
          //do stuff, execute functions -- whatever...

          scope.changeFolloweeList();
        });

        scope.changeFolloweeList = function() {

          var followeeList = $rootScope.user.getFollowees();

          angular.forEach(scope.answers, function(e) {
            e.owner.currentUser = {
              follow : false
            };

            angular.forEach(followeeList, function(f) {
              if(f == e.owner.id) {
                e.owner.currentUser.follow = true;
              }
            });
          });
        };
      }
    }
  }]);
