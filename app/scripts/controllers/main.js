'use strict';

/**
 * @ngdoc function
 * @name pearsonAngApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pearsonAngApp
 */
angular.module('pearsonAngApp')
  .controller('MainCtrl', function($scope, $http) {
   
    
    
    $scope.dane = [];
    $scope.daty= [];
    //$http.jsonp('https://pearsonmarketingcloud-test.apigee.net/psp/v1/productstatus.do?callback=JSON_CALLBACK')
    $http.get('test.json')
      .success(function(data) {
        console.log('DATA pass');
        $scope.dane = data.products; // response data
        $scope.daty = data.products[0].updates; // response data
        console.log($scope.daty);
      }).error(function() {
        console.log('DATA failed');
      });


  });
