angular.module('xbertsApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('application.main', {
        url: "/",
        templateUrl: 'scripts/feature/main/mainPage.html',
        controller: 'MainPageCtrl as mainCtrl',
        reloadOnSearch: false,
        cache:true,
        resolve: {
          topBanner:['MainService',function(MainService) {
            return MainService.getBannerList();
          }],
          dealsPaginator: ['Paginator', 'DealsService','ProductDeals',function (Paginator, DealsService, ProductDeals) {
            var par = {
              name: 'deals_main_list',
              objClass: ProductDeals,
              params: {
                page_size: 12
              },
              fetchFunction: DealsService.getDealsList
            };
            return new Paginator(par).load();
          }],
          latestPaginater: ['Paginator', 'ReviewService','Review', function (Paginator, ReviewService,Review) {
            var par = {
              name: 'trials',
              objClass:Review,
              params: {
                page_size: 6,
                review_type: 'FREE_SAMPLE'
              },
              fetchFunction: ReviewService.getList
            };
            return new Paginator(par).load();
          }],
          reviews: ['Paginator', 'MainService', 'MainModel', function (Paginator, MainService, MainModel) {
            var par = {
              name: 'all_report_list',
              objClass:MainModel,
              params: {
                page_size: 6
              },
              fetchFunction: MainService.getReviewsList
            };
            return new Paginator(par).load();
          }],
          topReviewers: ['Paginator', 'MainService', 'MainModel', function (Paginator, MainService, MainModel) {
            var par = {
              name: 'top_review_main_list',
              objClass:MainModel,
              params: {
                recommended:'True',
                page_size: 12
              },
              fetchFunction:MainService.getRecommendedReviewers
            };
            return new Paginator(par).load();
          }],
          askPaginator: ['Paginator', 'AskService', 'AskModel', function (Paginator, AskService, AskModel) {
            var par = {
              name: 'main_ask_questions_list',
              objClass: AskModel,
              params: {
                page_size: 4
              },
              fetchFunction: AskService.getList
            };
            return new Paginator(par).load();
          }],
          answerPaginator: ['Paginator', 'AskService', 'AskModel', function (Paginator, AskService, AskModel) {
            var par = {
              name: 'main_ask_answer',
              objClass: AskModel,
              params: {
                ordering: 'answer_amount-',
                page_size: 8
              },
              fetchFunction: AskService.getList
            };
            return new Paginator(par).load();
          }]
        }
      })
      .state('application.verificationEmail', {
        url: '/accounts/verify/email/:uid/:token',
        templateUrl: 'scripts/feature/main/mainPage.html',
        controller: 'MainPageCtrl as mainCtrl',
        reloadOnSearch: false,
        cache:true,
        resolve: {
          topBanner:['MainService',function(MainService) {
            return MainService.getBannerList();
          }],
          dealsPaginator: ['Paginator', 'DealsService','ProductDeals',function (Paginator, DealsService, ProductDeals) {
            var par = {
              name: 'deals_main_list',
              objClass: ProductDeals,
              params: {
                page_size: 12
              },
              fetchFunction: DealsService.getDealsList
            };
            return new Paginator(par).load();
          }],
          latestPaginater: ['Paginator', 'ReviewService','Review', function (Paginator, ReviewService,Review) {
            var par = {
              name: 'trials',
              objClass:Review,
              params: {
                page_size: 6,
                review_type: 'FREE_SAMPLE'
              },
              fetchFunction: ReviewService.getList
            };
            return new Paginator(par).load();
          }],
          reviews: ['Paginator', 'MainService', 'MainModel', function (Paginator, MainService, MainModel) {
            var par = {
              name: 'all_report_list',
              objClass:MainModel,
              params: {
                page_size: 6
              },
              fetchFunction: MainService.getReviewsList
            };
            return new Paginator(par).load();
          }],
          topReviewers: ['Paginator', 'MainService', 'MainModel', function (Paginator, MainService, MainModel) {
            var par = {
              name: 'top_review_main_list',
              objClass:MainModel,
              params: {
                recommended:'True',
                page_size: 12
              },
              fetchFunction:MainService.getRecommendedReviewers
            };
            return new Paginator(par).load();
          }],
          askPaginator: ['Paginator', 'AskService', 'AskModel', function (Paginator, AskService, AskModel) {
            var par = {
              name: 'main_ask_questions_list',
              objClass: AskModel,
              params: {
                page_size: 4
              },
              fetchFunction: AskService.getList
            };
            return new Paginator(par).load();
          }],
          answerPaginator: ['Paginator', 'AskService', 'AskModel', function (Paginator, AskService, AskModel) {
            var par = {
              name: 'main_ask_answer',
              objClass: AskModel,
              params: {
                ordering: 'answer_amount-',
                page_size: 8
              },
              fetchFunction: AskService.getList
            };
            return new Paginator(par).load();
          }]
        }
      })
  }]);
