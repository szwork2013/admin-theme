'use strict';

/**
 * @name            OnhanhVariant
 * @description     VariantDetailController
 */
var VariantAttributes = {
     product: {
          
     }
     price: 0,
     sale: 0,
     quantity: 0,
     options: []
}
var Controller = function($scope, $rootScope, variantService, $controller){
    
    $scope.route = {
         name: "product"
    }
    
    $scope.itemDefault = VariantAttributes;
    
    //Extend
    angular.extend($controller('baseDetailController', {
        service: variantService,
        $scope: $scope
    }), this);
}

Controller.$inject = [
    'variantService',
    '$controller',
];

variantModule.controller('variantDetailController', Controller);
