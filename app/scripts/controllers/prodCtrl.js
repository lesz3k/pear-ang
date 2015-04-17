'use strict';

/**
 * @ngdoc function
 * @name pearsonAngApp.controller:AboutCtrl
 * @description
 * # ProdCtrl
 * Controller of the pearsonAngApp
 */
angular.module('pearsonAngApp')
  .controller('ProductCtrl', function($scope, $location, $http, $stateParams) {

   
    $scope.productName = $stateParams.name;
    $scope.productData = [];

    //$http.jsonp('https://pearsondev.service-now.com/productstatus.do?callback=JSON_CALLBACK')
    
    $http.get($stateParams.jsonLocation)
      .success(function(data) {
        
        $scope.productData = data; // response data
      }).error(function() {
        
      });


    console.log($stateParams.jsonLocation);



  });
