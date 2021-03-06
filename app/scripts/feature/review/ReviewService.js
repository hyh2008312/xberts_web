'use strict';

angular.module('xbertsApp')
  .service('ReviewService', ['$resource', 'API_BASE_URL', '$q', '$rootScope', '$state', 'growl', 'Review', 'Report',
    'MainModel',
    function ($resource, API_BASE_URL, $q, $rootScope, $state, growl, Review, Report,MainModel) {
    var self = this;

    var ReviewResource = $resource(API_BASE_URL + '/review/reviews/:id/', {id: '@id'}, {'patch': {method: 'PATCH'}});

    self.getSurvey = function (reviewId) {
      return ReviewResource.get({id: reviewId}).$promise.then(Review.build);
    };

    self.updateReview = function (data) {
      return ReviewResource.patch(data).$promise;
    };

    self.getDetail = function (reviewId) {
      return $resource(API_BASE_URL + '/review/reviewdetail/:id/', {id: '@id'}).get({id: reviewId}).$promise.then(Review.build);
    };

    self.getList = function (params) {
      return $resource(API_BASE_URL + '/review/reviews/', {id: '@id'}, {
        'get' : {
          method:'GET',
            params:{
            no_auth: true
          }
        }
      }).get(params).$promise;
    };

    self.getRecommendedReviewers = function (params) {
      return $resource(API_BASE_URL + '/xberts/reviewers/', params).get().$promise;
    };

    self.applicantProtect = function (reviewId) {
      var deferred = $q.defer();

      var userId = $rootScope.user.getUserId();

      $resource(API_BASE_URL + '/review/reviews/' + reviewId + '/users/' + userId + '/applicants/')
        .get()
        .$promise
        .then(function (data) {
          if (data.count !== undefined && data.count > 0) {
            deferred.resolve(data.results[0]);
          } else {
            growl.error("Sorry, you have not been selected for review.");
            deferred.reject(('you have not been selected for review.'));
            $rootScope.$emit("backdropInit", 'backdropInit');
            $state.go('application.testingcampaign', {reviewId: reviewId});
          }
        });

      return deferred.promise;
    };

    self.exportAddress = function (reiviewId) {
      return $resource(API_BASE_URL + '/review/reviews/' + reiviewId + '/exportaddress/').save().$promise;
    };

    self.getApplicants = function (params) {
      return $resource(API_BASE_URL + '/review/reviews/:id/applicants/', {id: '@id'}).get(params).$promise.then(Review.buildPageList);
    };

    self.getReporters = function (params) {
      return $resource(API_BASE_URL + '/review/reviews/:id/reports/').get(params).$promise.then(Report.buildPageList);
    };

    self.checkIsApplicant = function(params) {
      return $resource(API_BASE_URL + '/review/applicants/').get(params).$promise.then(Review.buildPageList);
    };

    this.getArticleList = function (params) {
      return $resource(API_BASE_URL + '/articles/',null,{
        'get' : {
          method:'GET',
          params:{
            no_auth: true
          }
        }
      }).get(params).$promise.then(MainModel.buildPageList);
    };

    self.postBlog = function(params) {
      return $resource(API_BASE_URL + '/blogs/').save(params).$promise;
    };

    self.updateBlog = function(params) {
      return $resource(API_BASE_URL + '/blogs/:id/',{id:'@id'},{'patch': {method: 'PATCH'}}).patch(params).$promise;
    };

    self.getBlogDetail = function (reviewId) {
      return $resource(API_BASE_URL + '/blogs/:id/',{id:'@id'}).get({id:reviewId}).$promise.then(MainModel.build);
    };

    self.blogReport = function(report) {
      var followeeList = $rootScope.user.getFollowees();

      report.owner.currentUser = {
        follow: false
      };

      angular.forEach(followeeList, function(f) {
        if(f == report.owner.id) {
          report.owner.currentUser.follow = true;
        }
      });

      return report;
    };

    self.reviewReport = function(report) {
      var followeeList = $rootScope.user.getFollowees();

      report.applicant.reviewer.currentUser = {
        follow: false
      };

      angular.forEach(followeeList, function(f) {
        if(f == report.applicant.reviewer.id) {
          report.applicant.reviewer.currentUser.follow = true;
        }
      });

      return report;
    };

    self.reviewReportList = function(reportList) {
      var followeeList = $rootScope.user.getFollowees();

      angular.forEach(reportList.items, function(e) {
        e.reviewer.currentUser = {
          follow: false
        };

        angular.forEach(followeeList, function(f) {
          if(f == e.reviewer.id) {
            e.reviewer.currentUser.follow = true;
          }
        });
      });

      return reportList;
    };

    this.getBlogPending = function (params) {
      return $resource(API_BASE_URL + '/blogs/pending/').get(params).$promise.then(ProductDeals.buildPageList);
    };

    this.getBlogSkipList = function(params) {
      return $resource(API_BASE_URL + '/blogs/skipped/').get(params).$promise.then(ProductDeals.buildPageList);
    };

    this.setBlogSkip = function(params) {
      return $resource(API_BASE_URL + '/blogs/:id/mark_skipped/',{id:'@id'}).save(params).$promise;
    };

    this.getReviewPending = function (params) {
      return $resource(API_BASE_URL + '/review/reports/pending/').get(params).$promise.then(Report.buildPageList);
    };

    this.getReviewSkipList = function(params) {
      return $resource(API_BASE_URL + '/review/reports/skipped/').get(params).$promise.then(Report.buildPageList);
    };

    this.setReviewSkip = function(params) {
      return $resource(API_BASE_URL + '/review/reports/:id/mark_skipped/',{id:'@id'},{patch:{method:'PATCH'}})
        .patch(params).$promise;
    };

    this.latestPaginater = null;
    this.trialPaginator = null;
    this.reviewsFeaturedTop = null;

    this.categoryAdmin = [{
      id: null,
      src: null,
      name: 'PENDING<br>BLOG',
      value: 'everything'
    }, {
      id: 1,
      src: null,
      name: 'PENDING<br>REVIEW',
      value: 'everything'
    }, {
      id: 2,
      src: null,
      name: 'SKIP<br>BLOG',
      value: 'everything'
    }, {
      id: 3,
      src: null,
      name: 'SKIP<br>REVIEW',
      value: 'everything'
    }];
  }]);
