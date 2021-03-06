'use strict';

angular.module('xbertsApp')
  .controller('ReviewApplicantsCtrl', ['$scope', '$rootScope', '$filter', '$uibModal', 'SystemConstant', '$state', 'review', 'ReviewService', 'pendingApplicantPaginator', 'selectedApplicantPaginator', 'unselectedApplicantPaginator', '$q',
    function ($scope, $rootScope, $filter, $uibModal, SystemConstant, $state, review, ReviewService, pendingApplicantPaginator, selectedApplicantPaginator, unselectedApplicantPaginator, $q) {

      $rootScope.pageSettings.setBackgroundColor('background-whitem');
      $scope.COUNTRIES = SystemConstant.COUNTRIES;
      $scope.SOCIAL_TYPE = SystemConstant.SOCIAL_TYPE;
      $scope.LINKEDIN_CONNECTION = SystemConstant.LINKEDIN_CONNECTION;
      $scope.OTHER_CONNECTION = SystemConstant.OTHER_CONNECTION;
      $scope.JOB_FUNCTION = SystemConstant.JOB_FUNCTION;
      $scope.INDUSTRY = SystemConstant.INDUSTRY;
      $scope.review = review;

      var updateApplicantCount = function () {
        $scope.totalApplicants = pendingApplicantPaginator.count + selectedApplicantPaginator.count + unselectedApplicantPaginator.count;
        $scope.selectedApplicants = selectedApplicantPaginator.count;
        $scope.applicantLeft = review.quota - $scope.selectedApplicants;
      };

      var reloadApplicants = function () {
        $scope.$emit('backdropOn', 'post');

        pendingApplicantPaginator.clear();
        selectedApplicantPaginator.clear();
        unselectedApplicantPaginator.clear();

        var promises = [];
        promises.push(pendingApplicantPaginator.loadNext());
        promises.push(selectedApplicantPaginator.loadNext());
        promises.push(unselectedApplicantPaginator.loadNext());

        $q.all(promises)
          .then(function () {
            updateApplicantCount();

            $scope.$emit('backdropOff', 'success');
          })
          .catch(function () {
            $scope.$emit('backdropOff', 'error');
          });
      };

      updateApplicantCount();

      $scope.condition = $scope.review.isPublishApplicantsConfirmed ? 'Selected' : 'Pending';
      $scope.applicantsFilter = function () {
        switch ($scope.condition) {
          case "Dismissed":
            $scope.applicantPaginator = unselectedApplicantPaginator;
            break;
          case "Selected":
            $scope.applicantPaginator = selectedApplicantPaginator;
            break;
          case "Pending":
            $scope.applicantPaginator = pendingApplicantPaginator;
            break;
        }
      };
      $scope.applicantsFilter();
      $scope.ChangeCondition = function (condition) {
        $scope.condition = condition;
        $scope.applicantsFilter();
      };

      $scope.publish = function () {
        $scope.$emit('backdropOn', 'post');
        ReviewService
          .updateReview({id: review.id, isPublishApplicants: true})
          .then(
            function () {
              $scope.review.isPublishApplicants = true;
              $scope.$emit('backdropOff', 'success');
            }, function () {
              $scope.$emit('backdropOff', 'success');
            }
          );
      };
      $scope.ConfirmSelectionResult = function () {
        $scope.$emit('backdropOn', 'post');
        ReviewService
          .updateReview({id: review.id, isPublishApplicantsConfirmed: true})
          .then(
            function () {
              $scope.review.isPublishApplicantsConfirmed = true;
              $scope.$emit('backdropOff', 'success');
            }, function () {
              $scope.$emit('backdropOff', 'success');
            }
          );
      };

      $scope.exportAddress = function () {
        $scope.$emit('backdropOn', 'post');
        ReviewService.exportAddress(review.id).then(function () {
          $scope.$emit('backdropOff', 'success');
        });
      };

      $scope.markShipped = function (size, applicant) {
        if (!$rootScope.user.authRequired()) {
          return;
        }
        var modalInstance = $uibModal.open({
          templateUrl: 'scripts/feature/review/applicationSelect/review_applicant_mark_shipped.html',
          controller: 'ReviewMarkShippedCtrl',
          size: size,
          resolve: {
            applicant: function () {
              return applicant;
            },
            review: function () {
              return $scope.review;
            },
            applicantLeft: function () {
              return $scope.applicantLeft;
            }
          }
        });
        modalInstance.result.then(function () {
          // Successfully marked as shipped
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        });
      };

      $scope.open = function (size, applicant) {
        if (!$rootScope.user.authRequired()) {
          return;
        }
        var modalInstance = $uibModal.open({
          templateUrl: 'scripts/feature/review/applicationSelect/review_applicant_approval.html',
          controller: 'ApplicantSelectionCtrl',
          size: size,
          resolve: {
            applicant: function () {
              return applicant;
            },
            review: function () {
              return $scope.review;
            },
            applicantLeft: function () {
              return $scope.applicantLeft;
            }
          }
        });
        modalInstance.result.then(function () {
          reloadApplicants();
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        });
      };

    }])
  .controller('ApplicantSelectionCtrl', ['$scope', '$uibModalInstance', 'SystemConstant', 'applicant', 'review', 'ApplicationService', 'applicantLeft',
    function ($scope, $uibModalInstance, SystemConstant, applicant, review, ApplicationService, applicantLeft) {
      $scope.COUNTRIES = SystemConstant.COUNTRIES;
      $scope.GENDER_TYPE = SystemConstant.GENDER_TYPE;
      $scope.CAREER_STATUS = SystemConstant.CAREER_STATUS;
      $scope.COMPANY_SIZE = SystemConstant.COMPANY_SIZE;
      $scope.JOB_FUNCTION = SystemConstant.JOB_FUNCTION;
      $scope.INDUSTRY = SystemConstant.INDUSTRY;
      $scope.SOCIAL_TYPE = SystemConstant.SOCIAL_TYPE;
      $scope.LINKEDIN_CONNECTION = SystemConstant.LINKEDIN_CONNECTION;
      $scope.OTHER_CONNECTION = SystemConstant.OTHER_CONNECTION;
      $scope.review = review;
      $scope.applicant = applicant;
      $scope.applicantLeft = applicantLeft;
      $scope.select = function (isSelected) {
        $scope.$emit('backdropOn', 'post');
        ApplicationService
          .saveApplication({id: $scope.applicant.id, is_selected: isSelected})
          .then(
            function () {
              $scope.applicant.is_selected = isSelected;
              $scope.$emit('backdropOff', 'success');
              $uibModalInstance.close();
            }, function () {
              $scope.$emit('backdropOff', 'success');
            }
          );
      };
      $scope.close = function () {
        $uibModalInstance.dismiss();
      };
      if (applicant.answer) {
        $scope.answer = JSON.parse(applicant.answer);
      }
    }])
  .controller('ReviewMarkShippedCtrl', ['$scope', '$uibModalInstance', 'applicant', 'review', 'ApplicationService',
    function ($scope, $uibModalInstance, applicant, review, ApplicationService) {
      $scope.review = review;
      $scope.backApplicant = applicant;
      $scope.applicant = {
        id: applicant.id,
        is_shipped: true,
        ship: true,
        shipping_code: applicant.shipping_code,
        carrier: applicant.carrier
      };
      $scope.save = function () {
        if ($scope.shippingForm.$valid) {
          $scope.$emit('backdropOn', 'post');
          ApplicationService
            .saveApplication($scope.applicant)
            .then(
              function () {
                applicant.is_shipped = true;
                applicant.shipping_code = $scope.applicant.shipping_code;
                applicant.carrier = $scope.applicant.carrier;
                $scope.$emit('backdropOff', 'success');
                $uibModalInstance.close();
              }, function () {
                $scope.$emit('backdropOff', 'success');
              }
            );
        } else {
          $scope.shippingForm.submitted = true;
          $scope.shippingForm.$invalid = true;
        }
      };

      $scope.close = function () {
        $uibModalInstance.dismiss();
      };
    }]);
