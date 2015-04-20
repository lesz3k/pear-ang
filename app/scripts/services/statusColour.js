'use strict';

/**
 * @ngdoc overviewsss
 * @name pearsonAngApp
 * @description
 * # pearsonAngApp
 *
 * service of the application.
 */

myapp.
factory('statusColour', ['$window', function(product) {
  
     var className,
            amber =false,
            red = false,
            green = false,
             prodUpdates;
    
    if (product.updates!=undefined){
        prodUpdates = product.updates;
        
    }
    else {
        prodUpdates = product;
        
    }
        for (var i =0;i<prodUpdates.length;i++){
            if (prodUpdates[i].status==1){  
                amber = true;
            }
            else if (prodUpdates[i].status==2){ 
                red =true;
            }
            else {     
                green = true;
            }
        }
   
    
    
    
        if (amber == true){
            className = "amberProduct";
        }
        else if (red == true){
            className = "redProduct";
        }
        else {
            className = "greenProduct";
        }
        return className;
    
    
 }]);