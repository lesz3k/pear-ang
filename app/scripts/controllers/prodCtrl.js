'use strict';

/**
 * @ngdoc function
 * @name pearsonAngApp.controller:AboutCtrl
 * @description
 * # ProdCtrl
 * Controller of the pearsonAngApp
 */
angular.module('pearsonAngApp')
  .controller('ProductCtrl', function($scope, $location, $http, $stateParams, statusColour) {


    $scope.productName = $stateParams.name;
    $scope.productData = [];
    $scope.daty = [];


    //$http.jsonp('https://pearsondev.service-now.com/productstatus.do?callback=JSON_CALLBACK')

    $http.get($stateParams.jsonLocation)
      .success(function(data) {

        $scope.productData = data; // response data

        $scope.daty = data.updates;
        
        function subsDate(jsonPair) {
          for (var i = 0; i < jsonPair.length; i++) {
            var hour = jsonPair[i].date.slice(11, 16),
              date = jsonPair[i].date.slice(0, 10);
            jsonPair[i].date = {
              hour: hour,
              date: date
            };
          }
        }

        subsDate($scope.productData.updates);
        subsDate($scope.productData.rag_hrs);
        subsDate($scope.productData.rag_days);


        var lastHour = $scope.productData.lastupdated.slice(11, 16),
          lastDate = $scope.productData.lastupdated.slice(0, 10);
        $scope.productData.lastupdated = {
          hour: lastHour,
          date: lastDate
        };



      }).error(function() {

      });


    $scope.getStatus = function(a) {
      return statusColour.list(a);
    };
    console.log($stateParams.jsonLocation);



  });
