'use strict';
/**
 * @ngdoc function
 * @name pearsonAngApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pearsonAngApp
 */
angular.module('pearsonAngApp')
  .controller('MainCtrl', function($scope, $http, statusColour, $location, selectDate, notifyTest) {

    $scope.lastupdated = [];
    $scope.dane = [];
    $scope.daty = [];
    
    $scope.setDay = function(day){
        notifyTest.addSelectedDay(day);
    };
    
   
    
    function subsHour(elem) {
      return String(Date.parse((elem).substring(0, (elem).length - 1))).slice(16, 21)
    }

    function subsDate(elem) {
      return String(Date.parse((elem).substring(0, (elem).length - 1))).slice(4, 15)
    }


    //$http.jsonp('https://pearsonmarketingcloud-test.apigee.net/psp/v1/productstatus.do?callback=JSON_CALLBACK')
    $http.get('https://pearsonmarketingcloud-test.apigee.net/psp/v1/productstatus.do')
      .success(function(data) {
        console.log('DATA pass');

        $scope.lastupdated = {
          hour: subsHour(data.lastupdated),
          date: subsDate(data.lastupdated)
        };

        $scope.dane = data.products; // response data
        $scope.daty = data.products[0].updates; // response data
        
        
        
        for (var i = 0; i < $scope.dane.length; i++) {

        //$scope.dane[i].name = productName.encode($scope.dane[i].name);
            


          for (var k = 0; k < $scope.dane[i].updates.length; k++) {
            $scope.dane[i].updates[k].date = {
              hour: subsHour($scope.dane[i].updates[k].date),
              date: subsDate($scope.dane[i].updates[k].date)
            };
          }
        }

      }).error(function() {
        console.log('DATA failed');
      });

    $scope.getStatus = function(a) {
      return statusColour.list(a);
    };





  });
