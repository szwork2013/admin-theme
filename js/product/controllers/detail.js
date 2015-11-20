'use strict';

/**
 * @name            OnhanhProduct
 * @description     ProductDetailController
 */


var ProductDetailController = function($scope, ProductModel, $stateParams) {
    
    $scope.resource = ProductModel.item;
    
    //Gets product detail
    ProductModel.get($stateParams.id);
    
    [
        
        // Media
        'deleteFile',
        'upload',
        'selectMedia',
        
        // Select
        'sections',
        
        //Variant
        'selectTheme',
        'themeLabels',
        'generateVariant',
    ].forEach(function(value) {
        $scope[value] = ProductModel[value];
    });
}

Controller.$inject = [
    '$scope',
    'ProductModel',
    '$stateParams'
];

productModule
    .controller('productDetailController', ProductDetailController);
