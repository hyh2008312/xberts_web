angular.module('xbertsApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('application.main', {
        url: "/",
        templateUrl: 'scripts/feature/main/mainPage.html',
        controller: 'MainPageCtrl as mainCtrl',
        reloadOnSearch: false,
        resolve: {
          topBanner:['MainService',function(MainService) {
            return MainService.getBannerList();
          }],
          discoverProducts: ['Paginator', 'ShareProductService', 'ShareProduct', function (Paginator, ShareProductService, ShareProduct) {
            var par = {
              name: 'share_product_list',
              objClass: ShareProduct,
              params: {
                category: ShareProductService.categoryId,
                page_size: 5
              },
              fetchFunction: ShareProductService.getList
            };
            return new Paginator(par).load();
          }],
          trials: ['Paginator', 'MainService', 'MainModel', function (Paginator, MainService, MainModel) {
            var par = {
              name: 'progressingReview',
              objClass:MainModel,
              params: {
                page_size: 5,
                review_type: 'FREE_SAMPLE'
              },
              fetchFunction: MainService.getList
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
              name: 'callingReview',
              objClass:MainModel,
              params: {
                stage: 'READY_FOR_SALE',
                status: 'APPLICATION',
                page_size: 12
              },
              fetchFunction:MainService.getRecommendedReviewers
            };
            return new Paginator(par).load();
          }]
        }
      })

  }]);
