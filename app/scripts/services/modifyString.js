'use strict';

/**
 * @ngdoc overviews
 * @name pearsonAngApp
 * @description
 * # pearsonAngApp
 *
 * service for modifying URLs of the application.
 */

myApp.
service('modifyString',
    function () {
        var productName = {
            encode: function (str) {
                return str && str.replace(/ /g, '-');
            },
            decode: function (str) {
                return str && str.replace(/-/g, ' ');
            },
            is: angular.isString,
            pattern: /[^/]+/
        };
        return {
            url: productName
        };
    }
);
