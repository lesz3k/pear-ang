'use strict';

/**
 * @ngdoc overviews
 * @name pearsonAngApp
 * @description
 * # pearsonAngApp
 *
 * service for storing selected date.
 */

myApp.
service('selectDay',
    function () {
        var selectedDay = [];
        function addSelectedDay(msg) {
            if (msg == false) {
                selectedDay = [];
                return false;
            } else {
                selectedDay.push(msg);
                if (selectedDay.length == 2) {
                    selectedDay.shift();
                }
            }
        }
        return {
            addSelectedDay: addSelectedDay,
            selectedDay: function () {
                return String(selectedDay);
            }
        };
    }
);