'use strict';

angular.module('xbertsApp')
  .controller('MyQuestionsCtrl', ['$scope', '$rootScope','expert','Paginator','AskModel','ExpertService','$stateParams',
    function ($scope, $rootScope,expert,Paginator,AskModel,ExpertService, $stateParams) {
      $rootScope.pageSettings.setBackgroundColor('background-bg-white');
      $scope.expert = expert;
      $scope.isCurrentUser = $rootScope.user.isAuth() && $rootScope.user.getUserId() === expert.userId;

      var parQuestion = {
        name: 'questions_list_posts_' + $stateParams.expertId,
        objClass: AskModel,
        params: {
          id: $stateParams.expertId,
          page_size: 12
        },
        fetchFunction: ExpertService.getQuestionsList
      };
      $scope.postsQuestionPaginator = new Paginator(parQuestion);

    }]);
