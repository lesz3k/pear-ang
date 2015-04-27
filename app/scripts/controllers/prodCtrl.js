'use strict';

/**
 * @ngdoc function
 * @name pearsonAngApp.controller:AboutCtrl
 * @description
 * # ProdCtrl
 * Controller of the pearsonAngApp
 */
angular.module('pearsonAngApp')
  .controller('ProductCtrl', function($scope, $rootScope, $location, $http, $stateParams, statusColour, selectDate, notifyTest) {


    $scope.productName = $stateParams.name;
    $scope.day = function() {
      return notifyTest.selectedDay() ? notifyTest.selectedDay() : 'past 30 days';
    };


    $scope.productData = [];
    $scope.daty = [];
    $scope.selectedDate = [];
    $scope.prodNames = [];
    $scope.currentUrl = '';
    $scope.mainJSON = [];



    $scope.updateDaysList = function(day) {

      notifyTest.addSelectedDay(day);

      $scope.day = function() {
        return notifyTest.selectedDay();
      };

      $scope.selectedDate = [];
      $scope.chosenDate = function() {
        return day
      };
      for (var i = 0; i < $scope.productData.updates.length; i++) {
        if ($scope.productData.updates[i].date.date == $scope.day()) {
          $scope.selectedDate.push($scope.productData.updates[i]);
        }
      }
    };
    //$http.jsonp('https://pearsondev.service-now.com/productstatus.do?callback=JSON_CALLBACK')
    /*
    $http.get($stateParams.jsonLocation)
      .success(function(data) {

        $scope.productData = data; // response data

        $scope.daty = data.updates;

        function subsDate(jsonPair) {
          for (var i = 0; i < jsonPair.length; i++) {
            var hour = jsonPair[i].date.slice(11, 16),
              hourNoMins = jsonPair[i].date.slice(11, 13),
              date = jsonPair[i].date.slice(0, 10),
              dateOnlyDay = jsonPair[i].date.slice(8, 10);
            jsonPair[i].date = {
              hour: hour,
              hourNoMins: hourNoMins,
              dateOnlyDay: dateOnlyDay,
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

    */
    var productName = {
      encode: function(str) {
        return str && str.replace(/ /g, "-");
      },
      decode: function(str) {
        return str && str.replace(/-/g, " ");
      },
      is: angular.isString,
      pattern: /[^/]+/
    };

    $http.get('https://pearsonmarketingcloud-test.apigee.net/psp/v1/productstatus.do')
      .success(function(data) {
        //console.log(data.products);
        $scope.mainJSON = data.products; // response data

        for (var i = 0; i < $scope.mainJSON.length; i++) {
          var prodName = productName.encode($scope.mainJSON[i].name);
          $scope.prodNames.push(prodName);
          var prodName = productName.decode($scope.mainJSON[i].name);
        }

        var path = $location.path();

        for (var j = 0; j < $scope.prodNames.length; j++) {
          var prodName2 = $scope.prodNames[j];
          if (path.indexOf(prodName2) > 0) {
            $scope.currentUrl = prodName2;

            $http.get($scope.mainJSON[j].url)
              .success(function(subData) {
                console.log('sub JSON passed!');

                $scope.productData = subData; // response data
                $scope.daty = subData.updates;
                // $scope.lastUpdated;
                function subsDate(jsonPair) {
                  for (var k = 0; k < jsonPair.length; k++) {

                    var hour = String(Date.parse((jsonPair[k].date).substring(0, (jsonPair[k].date).length - 1))).slice(16, 21),
                      date = String(Date.parse((jsonPair[k].date).substring(0, (jsonPair[k].date).length - 1))).slice(4, 15),
                      onlyDay = String(Date.parse((jsonPair[k].date).substring(0, (jsonPair[k].date).length - 1))).slice(0, 3),
                      dateNoYear = String(Date.parse((jsonPair[k].date).substring(0, (jsonPair[k].date).length - 1))).slice(4, 10);


                    jsonPair[k].date = {
                      hour: hour,
                      date: date,
                      onlyDay: onlyDay,
                      dateNoYear: dateNoYear
                    };
                  }
                }
                subsDate($scope.productData.updates);
                subsDate($scope.productData.rag_hrs);
                subsDate($scope.productData.rag_days);


                //shows the date selected from the main page (by clicking on amber or red box)
                (function() {

                  if (notifyTest.selectedDay()) {

                    for (var i = 0; i < $scope.productData.updates.length; i++) {
                      if ($scope.productData.updates[i].date.date == $scope.day()) {
                        $scope.selectedDate.push($scope.productData.updates[i]);

                      }
                    }
                  } else {
                    for (var i = 0; i < $scope.productData.updates.length; i++) {

                      $scope.selectedDate.push($scope.productData.updates[i]);

                    }
                  }

                })();

                (function() {
                  var hour = String(Date.parse(($scope.productData.lastupdated).substring(0, ($scope.productData.lastupdated).length - 1))).slice(16, 21),
                    date = String(Date.parse(($scope.productData.lastupdated).substring(0, ($scope.productData.lastupdated).length - 1))).slice(4, 15);

                  $scope.productData.lastupdated = {
                    date: date,
                    hour: hour
                  };
                })();


                angular.forEach($scope.productData.rag_hrs, function(elem, ind) {
                  var arr = $scope.productData.rag_hrs;
                  if (arr[ind + 1] == undefined) {
                    return false;
                  } else {
                    if (arr[ind].date.onlyDay != arr[ind + 1].date.onlyDay) {
                      elem.dayEnd = 1;
                        $scope.dayPrev = elem.date.dateNoYear
                        $scope.dayNext = arr[ind + 1].date.dateNoYear;
                       elem.date.nextDay = arr[ind + 1].date.dateNoYear;
                    }
                      else{
                          elem.dayEnd = false;
                      }
                  }
               
                });


              }).error(function() {
                console.log('sub JSON failed');
              });

            return false;
          }
        }

      }).error(function() {
        console.log('DATA failed');
      });


    $scope.$on('$stateChangeSuccess', function updatePage() {
      $scope.currentPath = $location.path().replace('/', ' ').replace('/', ' > ').replace('/', ' > ');
    });



    $scope.getStatus = function(a) {
      return statusColour.list(a);
    };










  });
