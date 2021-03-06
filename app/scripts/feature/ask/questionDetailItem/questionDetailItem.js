angular.module('xbertsApp')
  .directive('questionDetailItem',['$rootScope','AskService','InviteService','$mdDialog','$mdBottomSheet',
    'localStorageService','$state','AskModel','Paginator','$mdMedia',
    function ($rootScope,AskService,InviteService,$mdDialog,$mdBottomSheet,localStorageService,$state,AskModel,
              Paginator,$mdMedia) {
    return {
      restrict: 'E',
      scope: {
        product : '=',
        showAnswer : '=',
        answers : '=',
        isPopupOpen: '=',
        admin: '='
      },
      templateUrl: 'scripts/feature/ask/questionDetailItem/question-detail-item.html',
      link: function (scope, element, attrs, ctrls) {
        scope.user = $rootScope.user;

        scope.$watch('$viewContentLoading', function() {
          if(angular.element('.xb-cover-view').length>0) {
            angular.element('.xb-cover-view').animate({
              scrollTop: 0
            },10,function() {
              var _offsetTop = angular.element('.xb-items-bottom-line').offset().top - 112;
              if(!$mdMedia('xs')) {
                angular.element('.xb-cover-view').on('scroll', function(e) {
                  if(e.currentTarget.scrollTop >= _offsetTop + 112) {
                    angular.element('.xb-question-detail__fixed-top-content:eq(1)').css({
                      display:'block',
                      position: 'fixed',
                      left:'0',
                      top: '0'
                    });
                  } else {
                    angular.element('.xb-question-detail__fixed-top-content:eq(1)').css({
                      display:'none',
                      position: 'relative',
                      top: 'auto'
                    });
                  }
                });
              } else {
                angular.element('.xb-cover-view > div:eq(0)').on("scroll", function(e) {
                  if(e.currentTarget.scrollTop >= _offsetTop + 112) {
                    angular.element('.xb-question-detail__fixed-top-content:eq(1)').css({
                      display:'block',
                      position: 'fixed',
                      left:'0',
                      top: '0'
                    });
                  } else {
                    angular.element('.xb-question-detail__fixed-top-content:eq(1)').css({
                      display:'none',
                      position: 'relative',
                      top: 'auto'
                    });
                  }
                });
              }
            });
          }
          if(!$rootScope.showToobar) {
            if(angular.element('.xb-body-view').length>0) {
              angular.element('.xb-body-view').animate({
                scrollTop: 0
              }, 10, function() {
                var _offsetTop = angular.element('.xb-items-bottom-line').offset().top - 112;
                angular.element('.xb-body-view').on('scroll', function(e) {
                  if(e.currentTarget.scrollTop >= _offsetTop) {
                    angular.element('.xb-question-detail__fixed-top-content:eq(0)').css({
                      display:'block',
                      position: 'fixed',
                      left:'0',
                      top: 56 +'px'
                    });
                  } else {
                    angular.element('.xb-question-detail__fixed-top-content:eq(0)').css({
                      display:'none',
                      position: 'relative',
                      top: 'auto'
                    });
                  }
                });
              });
            }
          }
        });

        var showConfirm = function(ev) {
          var confirm = $mdDialog.confirm()
            .textContent('You have already answered this question. Would you like to edit it?')
            .ariaLabel('Answer alert')
            .targetEvent(ev)
            .ok('Edit')
            .cancel('Cancel');

          $mdDialog.show(confirm).then(function() {
            $state.go('application.protected.editAnswer', {answerId:scope.answers[0].id});
          }, function() {});
        };

        scope.answer = function(scrollTopAnswer,ev) {
          if(!$rootScope.user.authRequired()) {
            return;
          }
          if(scope.answers && scope.answers.length > 0) {
            showConfirm(ev);
            return;
          }
          if(scope.answers == null && $rootScope.user.getUserId()) {
            var par = {
              name: 'ask_answers_detail',
              objClass: AskModel,
              params: {
                owner: $rootScope.user.getUserId(),
                question: scope.product.id,
                page_size: 12
              },
              fetchFunction: AskService.getAnswersList
            };
            var _par = new Paginator(par).load();
            _par.then(function(data) {
              scope.answers = data.items;
              if(scope.answers.length > 0) {
                showConfirm();
                return;
              }
              scope.showAnswer = !scope.showAnswer;
              if(scrollTopAnswer == true) {
                scope.showAnswer = true;
                angular.element('.xb-body-view').scrollTop(50);
              }
            });

            return;
          }
          scope.showAnswer = !scope.showAnswer;
          if(scrollTopAnswer == true) {
            scope.showAnswer = true;
            angular.element('.xb-body-view').scrollTop(50);
          }
        };

        scope.answerMobile = function(ev) {
          if(!$rootScope.user.authRequired()) {
            return;
          }
          if(scope.answers && scope.answers.length > 0) {
            showConfirm(ev);
            return;
          }
          if(scope.answers == null && $rootScope.user.getUserId()) {
            var par = {
              name: 'ask_answers_detail',
              objClass: AskModel,
              params: {
                owner: $rootScope.user.getUserId(),
                question: scope.product.id,
                page_size: 12
              },
              fetchFunction: AskService.getAnswersList
            };
            scope.answers = new Paginator(par).load().items;
            if(scope.answers.length > 0) {
              showConfirm();
              return;
            }
            $state.go('application.protected.answerPost',{questionId:scope.product.id});
            return;
          }
          $state.go('application.protected.answerPost',{questionId:scope.product.id});
        };

        scope.follow = function(product) {
          if(!$rootScope.user.authRequired()) {
            return;
          }
          AskService.follow(product.id).then(function(data) {
            var followeeList = $rootScope.user.getFollowedQuestions();
            if(product.currentUser) {
              product.currentUser.follow = data.follow;
            } else {
              product.currentUser = {};
              product.currentUser.follow = data.follow;
            }
            if(data.follow) {
              product.followeeCount++;
              followeeList.unshift(product.id);
              $rootScope.user.setFollowedQuestions(followeeList);
            } else {
              product.followeeCount--;
              var index = 0;
              angular.forEach(followeeList, function(e,i) {
                if(e == product.id) {
                  index = i;
                }
              });
              followeeList.splice(index,1);
              $rootScope.user.setFollowedQuestions(followeeList);
            }
            localStorageService.remove('following_answers_list_' + $rootScope.user.getUserId() + '_currentPage');
            localStorageService.remove('following_answers_list_' + $rootScope.user.getUserId() + '_items');
            localStorageService.remove('following_answers_list_' + $rootScope.user.getUserId() + '_next');
            localStorageService.remove('following_answers_list_' + $rootScope.user.getUserId() + '_count');
          }, function() {});
        };


        // FAB Speed Dial Component
        // Set the component to the normal state
        scope.hidden = false;
        scope.isOpen = false;
        scope.hover = false;
        scope.shareList = [
          { name: "facebook" },
          { name: "linkedin" },
          { name: "twitter" }
        ];

        scope.inviteObj = angular.copy(InviteService, {});

        scope.answerQuestion = function(ev) {
          $mdDialog.show({
            controller: function(scope, $mdDialog) {

              scope.cancel = function() {
                $mdDialog.cancel();
              };
              scope.user = $rootScope.user;
              scope.answer = {};
              scope.imgLoaded = false;
              scope.showMask = false;
              scope.formToggle = true;
              scope.onShowMask = function() {
                scope.showMask = !scope.showMask;
              };

              scope.offDeleteImage = function() {
                scope.showMask = false;
                scope.imgLoaded = false;
                scope.answer.image = null;
              };

              var coverSuccessCallback = function (data) {
                scope.showMask = false;
                scope.imgLoaded = true;
                scope.answer.image = data.data.id;
              };
              var errorCallback = function (error) {
                // Don't display error when user cancels upload
                if (error.status === -1) {
                  return;
                }
              };
              scope.coverUpload = function ($file) {
                if(!$rootScope.user.authRequired()) {
                  return;
                }
                if ($file) {
                  UploadService.uploadFile($file, 'SHARE_PRODUCT', scope)
                    .then(coverSuccessCallback, errorCallback);
                }
              };

              scope.submitForm = function(answer,answerForm){
                if(!$rootScope.user.authRequired()) {
                  scope.cancel();
                  return;
                }
                if (!answerForm.$valid) {
                  return;
                }

                var _product = {
                  question: scope.questionId,
                  description: answer.description,
                  productLink: {
                    url:answer.productLink
                  },
                  image:answer.image,
                  videoUrl:answer.videoUrl
                };

                // post start
                scope.$emit('backdropOn', 'fetch project');
                AskService.createAnswers(_product).then(function (newProduct) {
                  scope.$emit('backdropOff', 'success');
                  scope.answer = {};
                  scope.offDeleteImage();
                  scope.formToggle = !scope.formToggle;
                  scope.detailCtrl.addProduct(newProduct);
                  scope.cancel();
                  angular.element('.xb-body-view').scrollTop(angular.element('.xb-question-detail__answer-title').offset().top);
                }, function () {
                  // tips
                  scope.$emit('backdropOff', 'project get error');
                  // post end
                });
              };
            },
            templateUrl: 'scripts/feature/ask/answerPost/answer-post.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            disableParenScroll: true,
            fullscreen:true
          });
        };

        scope.showListBottomSheet = function() {
          $mdBottomSheet.show({
            templateUrl: 'scripts/feature/ask/questionDetailItem/question-detail-bottom-sheet.html',
            controller: function($scope, $mdBottomSheet) {
              $scope.hidden = false;
              $scope.isOpen = false;
              $scope.hover = false;
              $scope.shareList = [
                { name: "facebook" },
                { name: "linkedin" },
                { name: "twitter" }
              ];

              $scope.product = scope.product;
              $scope.inviteObj = scope.inviteObj;
            }
          }).then(function() {

          }).catch(function(error) {
            // User clicked outside or hit escape
          });
        };

        scope.$on('$destory', function() {
          angular.element('.xb-body-view').off('scroll');
          angular.element('.xb-cover-view').off('scroll');
        });

        scope.skip = function(product) {
          if(!$rootScope.user.authRequired()) {
            return;
          }
          product.skipped = !product.skipped;
          AskService.setSkip(product).then(function(data) {});
        };
      }
    }
  }]);
