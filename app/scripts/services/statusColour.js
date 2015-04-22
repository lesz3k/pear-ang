'use strict';

/**
 * @ngdoc overviewsss
 * @name pearsonAngApp
 * @description
 * # pearsonAngApp
 *
 * service of the application.
 */

myApp.
service('statusColour', function() {

  this.list = function(product) {
    var className,
      amber = false,
      red = false,
      green = false,
      prodUpdates = [];

    function setColor(prodUpdates) {
      for (var i = 0; i < prodUpdates.length; i++) {
        if (prodUpdates[i].status === 1) {
          amber = true;
        } else if (prodUpdates[i].status === 2) {
          red = true;
        } else {
          green = true;
        }
      }
    }
      
    if (product.updates !== undefined) {
      prodUpdates = product.updates;
      setColor(prodUpdates);
    } else {
      prodUpdates = [];
      prodUpdates.push(product);
      setColor(prodUpdates);
    }

    

    if (red === true) {
      className = 'redProduct';
    } else if (amber === true) {
      className = 'amberProduct';
    } else {
      className = 'greenProduct';
    }
    return className;
  };

});
