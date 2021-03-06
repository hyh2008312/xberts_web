'use strict';

angular.module('xbertsApp')
  .factory('SystemData', ['$resource', '$rootScope', '$q', 'API_BASE_URL',
    function ($resource, $rootScope, $q, API_BASE_URL) {
    var targetGeoResource = $resource(API_BASE_URL + '/projects/target_geos/', null);
    var supportTypeResource = $resource(API_BASE_URL + '/projects/support_types/', null);
    var projectTypeResource = $resource(API_BASE_URL + '/projects/project_categories/', null);
    var transportationModelResource = $resource(API_BASE_URL + '/projects/transportation_models/', null);
    var stagesResource = $resource(API_BASE_URL + '/xberts/stages/', null);

    var saleChannelsResource = $resource(API_BASE_URL + '/projects/sale_channels/', null);

    var targetGeos = null;
    var transportationModels = null;
    var supportTypes = null;
    var projectTypes = null;
    var stages = null;
    var saleChannels = null;

    var systemData = {};
    systemData.stringParseToCheckboxes = function (string, checkboxes) {
      //id selected
      var trueCheckboxes = string.split(",");
      for (var j = 0; j < trueCheckboxes.length; j++) {
        for (var i = 0; i < checkboxes.length; i++) {
          if (Number(checkboxes[i].id) === Number(trueCheckboxes[j])) {
            checkboxes[i].selected = true;
          }
        }
      }
    };
    var checkboxClear = function (checkboxes) {
      if(checkboxes){
        for (var i = 0; i < checkboxes.length; i++) {
          checkboxes.selected = false;
        }
      }
    };
    systemData.getStages = function () {
      return stages;
    };
    systemData.getStagesPromise = function () {
      var delay = $q.defer();
      if (stages === null) {
        stagesResource.query(function (results) {
          stages = results;
          delay.resolve(stages);
        });
      } else {
        delay.resolve(stages);
      }
      return delay.promise;
    };
    systemData.getProjectTypes = function () {
      return projectTypes;
    };
    systemData.getProjectTypesPromise = function () {
      var delay = $q.defer();
      if (projectTypes === null) {
        projectTypeResource.query(function (results) {
          projectTypes = results;
          delay.resolve(projectTypes);
        });
      } else {
        delay.resolve(projectTypes);
      }
      return delay.promise;
    };
    systemData.getTargetGeos = function () {
      checkboxClear(supportTypes);
      return targetGeos;
    };
    systemData.getTargetGeosPromise = function () {
      var delay = $q.defer();
      if (targetGeos === null) {
        targetGeoResource.query(function (results) {
          targetGeos = results;
          delay.resolve(targetGeos);
        });
      }
      else {
        checkboxClear(targetGeos);
        delay.resolve(targetGeos);
      }
      return delay.promise;
    };
    systemData.getSupportTypes = function () {
      checkboxClear(supportTypes);
      return supportTypes;
    };
    systemData.getSupportTypesPromise = function () {
      var delay = $q.defer();
      if (supportTypes === null) {
        supportTypeResource.query(function (results) {
          supportTypes = results;
          delay.resolve(supportTypes);
        });
      } else {
        checkboxClear(supportTypes);
        delay.resolve(supportTypes);
      }
      return delay.promise;
    };
    systemData.getTransportationModels = function () {
      return transportationModels;
    };
    systemData.getTransportationModelsPromise = function () {
      var delay = $q.defer();
      if (transportationModels === null) {
        transportationModelResource.query(function (results) {
          transportationModels = results;
          delay.resolve(transportationModels);
        });
      } else {
        delay.resolve(transportationModels);
      }
      return delay.promise;
    };

    systemData.getSaleChannels = function () {
      checkboxClear(saleChannels);
      return saleChannels;
    };
    systemData.getSaleChannelsPromise = function () {
      var delay = $q.defer();
      if (saleChannels === null) {
        saleChannelsResource.query(function (results) {
          saleChannels = results;
          delay.resolve(saleChannels);
        });
      } else {
        checkboxClear(supportTypes);
        delay.resolve(saleChannels);
      }
      return delay.promise;
    };

    return systemData;
  }]);
