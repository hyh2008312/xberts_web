'use strict';

angular.module('xbertsApp')
  .controller('ProductDealsListPageCtrl', ['$window','$rootScope','productsPaginator', 'DealsService', 'ShareProductService',
    '$mdSidenav','$timeout','$state','DealsFactory','$scope','ProductDeals','category','Paginator',
    function ($window, $rootScope, productsPaginator, DealsService, ShareProductService, $mdSidenav,
              $timeout,$state,DealsFactory,$scope,ProductDeals,category,Paginator) {
    var dealsCtrl = this;

    DealsService.getCategoryList = DealsFactory.getCategory(category);

    dealsCtrl.categories = DealsService.getCategoryList;
    dealsCtrl.price = DealsService.getPrice();
    dealsCtrl.discount = DealsService.getDiscount();

    dealsCtrl.categoryId = DealsService.categoryId;
    dealsCtrl.priceId = DealsService.priceId;
    dealsCtrl.discountId = DealsService.discountId;

    $scope.selectedIndex = 0;
    DealsFactory.updateActiveTabOnSearch($scope, dealsCtrl.categories);
    $scope.$on('$locationChangeSuccess', function () {
      DealsFactory.updateActiveTabOnSearch($scope, dealsCtrl.categories);
      if( dealsCtrl.categories[$scope.selectedIndex]) {
        dealsCtrl.changeCategory( $scope.selectedIndex);
      }
    });

    if($scope.selectedIndex == 0) {
      dealsCtrl.productsPaginator = DealsFactory.rebuildProduct(productsPaginator,DealsService.getCategoryList);
    } else {
      dealsCtrl.productsPaginator = productsPaginator;
    }

    dealsCtrl.post = function() {
      if(!$rootScope.user.authRequired()) {
        return;
      }
      $state.go('application.protected.post');
    };

    dealsCtrl.changeCategory = function ($index) {
      $scope.selectedIndex = $index;

      var categoryId = dealsCtrl.categories[$scope.selectedIndex].id;

      DealsService.categoryId = categoryId;
      dealsCtrl.categoryId = DealsService.categoryId;
      DealsService.priceId = null;
      DealsService.discountId = null;
      dealsCtrl.priceId = DealsService.priceId;
      dealsCtrl.discountId = DealsService.discountId;

      if($scope.selectedIndex == 0) {
        DealsFactory.updateUrl($scope,dealsCtrl.categories);
        dealsCtrl.productsPaginator = null;
        DealsService.getHomeList().then(function(data) {
          dealsCtrl.productsPaginator = DealsFactory.rebuildProduct(data,DealsService.getCategoryList);
        });
      } else {

        var par = {
          name: 'deals_product_list',
          objClass: ProductDeals,
          params: {
            category: DealsService.categoryId,
            min_price: DealsService.priceId != null ? DealsService.getPrice()[DealsService.priceId].value1: null,
            max_price: DealsService.priceId != null ? DealsService.getPrice()[DealsService.priceId].value2: null,
            page_size: 12
          },
          fetchFunction: DealsService.getDealsList
        };


        if(categoryId != 'lighting_deals') {
          par.params.category = categoryId || null;
          par.params.promotion = null;
        } else {
          par.params.category =  null;
          par.params.promotion = true;
        }

        DealsFactory.updateUrl($scope,dealsCtrl.categories);
        dealsCtrl.productsPaginator = new Paginator(par);
        dealsCtrl.productsPaginator.clear();
        dealsCtrl.productsPaginator.load();
      }
    };

    dealsCtrl.changePrice = function(filterIndex) {
      if(filterIndex != null) {
        var item = dealsCtrl.price[filterIndex];
        DealsService.priceId = item.id;
        dealsCtrl.priceId = DealsService.priceId;
        dealsCtrl.productsPaginator.params.min_price = item.value1;
        dealsCtrl.productsPaginator.params.max_price = item.value2;
      } else {
        DealsService.priceId = null;
        dealsCtrl.priceId = DealsService.priceId;
        dealsCtrl.productsPaginator.params.min_price = null;
        dealsCtrl.productsPaginator.params.max_price = null;
      }
      dealsCtrl.productsPaginator.clear();
      dealsCtrl.productsPaginator.load();
    };

    dealsCtrl.changeDiscount = function(discountIndex) {
      if(discountIndex != null) {
        var item = dealsCtrl.discount[discountIndex];
        DealsService.discountId = item.id;
        dealsCtrl.discountId = DealsService.discountId;
        dealsCtrl.productsPaginator.params.dicount = item.value1;
      } else {
        DealsService.discountId = null;
        dealsCtrl.discountId = DealsService.discountId;
        dealsCtrl.productsPaginator.params.dicount = null;
      }
      dealsCtrl.productsPaginator.clear();
      dealsCtrl.productsPaginator.load();
    };

    var title = 'Discover - Exclusive Deals Curated by Community';
    var description = 'Discover the latest products and deals for a better life';
    var backgroundColor = 'background-bg-light';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);

