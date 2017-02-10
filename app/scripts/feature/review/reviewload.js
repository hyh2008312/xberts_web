'use strict';

angular.module('xbertsApp')
  .factory('ReviewLoad', ['Review', '$q', function (Review, $q) {
    return function ($stateParams) {
      var delay = $q.defer();
      Review.get({id: $stateParams.reviewId}, function (review) {
        delay.resolve(review);
      }, function () {
        delay.reject(('Unable to fetch review'));
      });
      return delay.promise;
    };
  }]);