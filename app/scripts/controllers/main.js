'use strict';
/**
 * @ngdoc function
 * @name pearsonAngApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pearsonAngApp
 */
angular.module('pearsonAngApp')
    .controller('MainCtrl', function ($scope, $http, statusColour, $location, selectDay, substractDate) {

        $scope.lastupdated = [];
        $scope.dane = [];
        $scope.daty = [];

        $scope.setDay = function (day) {
            selectDay.addSelectedDay(day);
        };

        console.log( selectDay.selectedDay().length === 0);    
    
        $http.get('test-jsons/products.json')
            .success(function (data) {
                console.log('DATA pass');

                $scope.lastupdated = {
                    hour: substractDate.subs.hour(data.lastupdated),
                    date: substractDate.subs.date(data.lastupdated)
                };

                $scope.dane = data.products; // response data
                $scope.daty = data.products[0].updates; // response data     

                for (var i = 0; i < $scope.dane.length; i++) {
                    for (var k = 0; k < $scope.dane[i].updates.length; k++) {
                        $scope.dane[i].updates[k].date = {
                            hour: substractDate.subs.hour($scope.dane[i].updates[k].date),
                            date: substractDate.subs.date($scope.dane[i].updates[k].date)
                        };
                    }
                }

            }).error(function () {
                console.log('DATA failed');
            });

        $scope.getStatus = function (a) {
            return (a == 2 ? "redProduct" : a == 1 ? "amberProduct" : "greenProduct");
        };


    });