'use strict';
/**
 * @ngdoc function
 * @name pearsonAngApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pearsonAngApp
 */
angular.module('pearsonAngApp')
  .controller('MainCtrl', function($scope, $http, statusColour, $location) {

    $scope.lastupdated = [];
    $scope.dane = [];
    $scope.daty = [];
    //$http.jsonp('https://pearsonmarketingcloud-test.apigee.net/psp/v1/productstatus.do?callback=JSON_CALLBACK')
    $http.get('test.json')
      .success(function(data) {
        console.log('DATA pass');
        
        
        (function(){
            var hour = String(Date.parse((data.lastupdated).substring(0, (data.lastupdated).length - 1))).slice(16, 21),
                date = String(Date.parse((data.lastupdated).substring(0, (data.lastupdated).length - 1))).slice(4, 15);
            
        $scope.lastupdated = {
            hour: hour,
            date: date
          };
        })();
        
        
        $scope.dane = data.products; // response data
        $scope.daty = data.products[0].updates; // response data
        
        
        
        
        for (var i = 0; i < $scope.daty.length; i++) {
            
      
           var hour = String(Date.parse(($scope.daty[i].date).substring(0, ($scope.daty[i].date).length - 1))).slice(16, 21),
            date = String(Date.parse(($scope.daty[i].date).substring(0, ($scope.daty[i].date).length - 1))).slice(4, 15);
            
         
            
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
    
    
  
    
    console.log(Date.parse('2015-04-11T00:00:00'));
                
    

  });
