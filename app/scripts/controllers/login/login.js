'use strict';

angular.module('xbertsApp')
  .controller('LoginCtrl', ['$scope', '$rootScope', '$location', '$state', '$stateParams', 'Configuration',
    'AuthService', 'AnalyticsService', '$mdDialog','GooglePlusLogin',
    function($scope, $rootScope, $location, $state, $stateParams, Configuration,
             AuthService, AnalyticsService, $mdDialog,GooglePlusLogin) {
      if ($stateParams.error === 'linkedin_login') {
        $scope.loginError = {linkedinError: true};

        $location.search('error', null);
      } else {
        $scope.loginError = {};
      }

      $scope.googleLogin = function() {
        $scope.$emit('backdropOn', 'post');

        AnalyticsService.sendPageView('/googlelogin');

        AuthService.googleLogin().then(function () {
            $scope.$emit('backdropOff', 'success');
            if($rootScope.user.getUserEmail()) {
              AuthService.loginRedirect();
            }
          })
          .catch(function (response) {
            $scope.$emit('backdropOff', 'error');
          });
      };

      $scope.linkedinLogin = function() {
        $scope.$emit('backdropOn', 'post');

        AnalyticsService.sendPageView('/linkedinlogin');

        AuthService.linkedinLogin();
      };

      $scope.facebookLogin = function(loginError) {
        $scope.$emit('backdropOn', 'post');

        AnalyticsService.sendPageView('/facebooklogin');

        AuthService.facebookLogin()
          .then(function () {
            $scope.$emit('backdropOff', 'success');
            if($rootScope.user.getUserEmail()) {
              AuthService.loginRedirect();
            }
          })
          .catch(function (response) {
            $scope.$emit('backdropOff', 'error');

            if (response === 'missing_permission') {
              loginError.facebookPermissionError = true;
            } else {
              loginError.facebookError = true;
            }
          });
      };

      $scope.login = function(form) {
        if (!$scope.loginForm.$valid) {
          return;
        }
        $scope.$emit('backdropOn', 'post');

        AnalyticsService.sendPageView($location.path() + '/confirm');

        form.serverError = {};

        AuthService.login({username: $scope.username, password: $scope.password})
          .then(function(value) {
            AuthService.loginRedirect();
          })
          .catch(
            function(httpResponse) {
              $scope.$emit('backdropOff', 'error');

              if (httpResponse.status === 401 || httpResponse.status === 403) {
                form.serverError = {invalidCredentials: true};
              } else if (httpResponse.status === 400 && httpResponse.data.error === 'linkedin_signup') {
                form.serverError = {linkedinSignup: true};
              } else {
                form.serverError = {generic: true};
              }
            });
      };

      $scope.showLogin = function(ev) {
        $mdDialog.show({
          controller: function(scope, $mdDialog) {
            scope.cancel = function() {
              $mdDialog.cancel();
            };
            scope.login = function(form) {
              if (!scope.loginForm.$valid) {
                return;
              }
              $scope.$emit('backdropOn', 'post');

              AnalyticsService.sendPageView($location.path() + '/confirm');

              form.serverError = {};

              AuthService.login({username: scope.username, password: scope.password})
                .then(function(value) {
                  AuthService.loginRedirect();
                  $mdDialog.cancel();
                })
                .catch(
                  function(httpResponse) {
                    $scope.$emit('backdropOff', 'error');
                    if (httpResponse.status === 401 || httpResponse.status === 403) {
                      form.serverError = {invalidCredentials: true};
                    } else if (httpResponse.status === 400 && httpResponse.data.error === 'linkedin_signup') {
                      form.serverError = {linkedinSignup: true};
                    } else {
                      form.serverError = {generic: true};
                    }
                  });
            };
          },
          templateUrl: 'scripts/feature/login/login-dialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          disableParenScroll: true
        });
      };

      var title = 'Xberts – Login';
      var description = "Log in to your Xberts account. It's good to have you back!";
      var backgroundColor = 'background-bg-light';
      var shareImage = '';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
    }]);
