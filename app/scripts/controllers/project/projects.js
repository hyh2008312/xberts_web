'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('ProjectsCtrl', ['$scope', 'projectPaginator', 'SystemData','localStorageService', function ($scope, projectPaginator, SystemData,localStorageService) {
    $scope.projectTypes = SystemData.getProjectTypes();
    $scope.projectPaginator = projectPaginator;
    $scope.projectPaginator.watch($scope, 'projectPaginator.currentPage');
    $scope.projects = {
      project_category_id: localStorageService.get('project_search_type') || '',
      ordering: localStorageService.get('project_search_order') || '-date_published'
    };
    $scope.onSearch = function () {
      $scope.projectPaginator.params = $scope.projects;
      $scope.projectPaginator.items = [];
      $scope.projectPaginator.currentPage = 0;
      $scope.projectPaginator.next = 'true';
      $scope.projectPaginator.loadNext();
    };
    $scope.$watch('projects.project_category_id + projects.ordering', function () {
      localStorageService.set('project_search_type', $scope.projects.project_category_id);
      localStorageService.set('project_search_order', $scope.projects.ordering);
    });
  }]);