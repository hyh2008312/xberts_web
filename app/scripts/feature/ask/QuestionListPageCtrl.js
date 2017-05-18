angular.module('xbertsApp')
  .controller('QuestionListPage', ['$rootScope','askPaginator','topReviewers','$mdDialog','AskService',
    function ($rootScope,askPaginator,topReviewers,$mdDialog,AskService) {

    var askCtrl = this;
    askCtrl.askPaginator = askPaginator;
    askCtrl.topReviewers = topReviewers.items;
    askCtrl.order = AskService.order;

    askCtrl.addQuestion = function(ev) {
      $mdDialog.show({
        controller: function(scope, $mdDialog) {

          scope.cancel = function() {
            $mdDialog.cancel();
          };
          scope.askQuestion = function(question) {
            if(!$rootScope.user.authRequired()) {
              scope.cancel();
              return;
            }
            if (!scope.recommendation.$valid) {
              return;
            }

            scope.$emit('backdropOn', 'post');
            AskService.create(question).then(function(data) {
              scope.cancel();
              askCtrl.askPaginator.items.unshift(data);
              scope.$emit('backdropOff', 'success');
            },function() {
              scope.$emit('backdropOff', 'failure');
            });
          };
        },
        templateUrl: 'scripts/feature/ask/recommendationPost/recommendation-post-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        disableParenScroll: true
      });
    };

    askCtrl.changeOrder = function(order) {
      AskService.order = order;
      askCtrl.order = AskService.order;
      var answerAmount = null;
      switch (askCtrl.order) {
        case 1:
          answerAmount = 0;
              break;
      }
      askCtrl.askPaginator.params.answer_amount = answerAmount;
      askCtrl.askPaginator.clear();
      askCtrl.askPaginator.load();
    };

    var title = 'Ask - Ask Xperts Community & Make Smart Purchasing Decision';
    var description = 'Get product recommendations from our global community of savvy-shopper';
    var backgroundColor = 'background-bg-light';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);
