'use strict';

/**
 * @ngdoc function
 * @name yeodjangoApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the yeodjangoApp
 */
angular.module('yeodjangoApp')
  .controller('EventsCtrl', ['$scope', 'eventPartnerPaginator', 'eventPaginator',
    function ($scope, eventPartnerPaginator, eventPaginator) {
      $scope.eventPaginator = eventPaginator;
      $scope.eventPaginator.watch($scope, 'eventPaginator.currentPage');

      $scope.slides = [
        {
          image: '/images/event_1.jpg',
          text: 'Xberts partnered with 360Fashion Network to present an epic smart fashion expo in San Francisco'
        },

        {
          image: '/images/event_3.jpg',
          text: 'GLXSS team presented their products to international buyers on Xberts booth '
        },
        {
          image: '/images/event_2.jpg',
          text: 'Xberts team co-hosted the largest innovation and entrepreneurship forum - SVIEF 2015'
        }
      ];
    }]);
