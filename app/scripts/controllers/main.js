'use strict';
/**
 * @ngdoc function
 * @name pearsonAngApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pearsonAngApp
 */
angular.module('pearsonAngApp')
  .controller('MainCtrl', function($scope, $http, statusColour) {

    $scope.dane = [];
    $scope.daty = [];
    //$http.jsonp('https://pearsonmarketingcloud-test.apigee.net/psp/v1/productstatus.do?callback=JSON_CALLBACK')
    $http.get('test.json')
      .success(function(data) {
        console.log('DATA pass');
        $scope.dane = data.products; // response data
        $scope.daty = data.products[0].updates; // response data

        for (var i = 0; i < $scope.daty.length; i++) {
          var hour = $scope.daty[i].date.slice(11, 16),
            date = $scope.daty[i].date.slice(0, 10);

          $scope.daty[i].date = {
            hour: hour,
            date: date
          };
        }

      }).error(function() {
        console.log('DATA failed');
      });

    $scope.getStatus = function (a){      
      return statusColour.list(a);
    };
    
    
    

  });
