'use strict';

/**
 * @name            OnhanhProduct
 * @description     ProductAddController
 */


var ProductAttributes = {
    name: null,
    current: {
        price: 0,
        sale: 0,
        quantity: 1,
    },
    medias: [{
        path:"/admin-theme/examples/images/1.jpg"
    }],
    description_list: [],
    description: [],
    keywords: null,
    attrs: [{}],
    variant_options: [],
    variants: [],
    status: 'private',
    template: null,
}

// list template
var templates = [
    
    
    ['color_name'],
    ['size_name'],
    ['style_name'],
    ['configure_name'],
    
    
    ['color_name', 'size_name'],
    ['color_name', 'stype_name'],
    ['color_name', 'configure_name'],
    ['color_name', 'size_name', 'style_name'],
    ['color_name', 'size_name', 'configure_name'],
    
    ['size_name', 'style_name'],
    ['size_name', 'configure_name'],
    ['size_name', 'style_name', 'configure_name'],
    
    ['style_name', 'configure_name'],
];

var variantOptionValues = {
    color_name: "Màu sắc",
    size_name: "Kích thước",
    style_name: "Kiểu dáng",
    configure_name: "Cấu hình"
};

var templateValues = [
    'Màu sắc',
    'Kích thước',
    'Kiểu dáng',
    'Cấu hình',
    
    'Màu sắc, Kích thước',
    'Màu sắc, Kiểu dáng',
    'Màu sắc, Cấu hình',
    'Màu sắc, Kích thước, Kiểu dáng',
    'Màu sắc, Kích thước, Cấu hình',
    
    
    'Kích thước, Kiểu dáng',
    'Kích thước, Cấu hình',
    'Kích thước, Kiểu dáng, Cấu hình',
    
    'Kiểu dáng, Cấu hình'
];

var Controller = function($scope, $rootScope, $state, productService, mediaService,
 $controller, variantOption, Constants) {

    // product default attribute
    $scope.item = angular.copy(ProductAttributes);

    $scope.templateValues = templateValues;

    $scope.selectTemplate = function(id) {
        if(!templates[id]) {
            $scope.item.template = null;
            $scope.item.variant_options = [];
            return;
        }
        $scope.item.variant_options = [];
        var variantOptionNames = templates[id];
        variantOptionNames.forEach(function(value, index) {
            $scope.item.variant_options.push({
                name: value,
                label: variantOptionValues[value],
                items: []
            })
        });

    }

    $scope.generateVariants = function(key, data) {
        key = key || 0;
        if(key === 0) {
            $scope.item.variants = [];
        }

        var options = $scope.item.variant_options;
        data = data || [];
        (options[key].items).forEach(function(value, index) {
            var item = angular.copy(data);
            item.push(index);
            if(!options[key + 1]) {
                $scope.item.variants.push({
                    options: item,
                    price: 0,
                    sale: 0,
                    quantity: 1,
                });
                return;
            }
            $scope.generateVariants(key + 1, item);
        });
    }


    $scope.getVariantOptionValues = function(options) {
        var result = [];
        options.forEach(function(value, index) {
            result.push($scope.item.variant_options[index].items[value].text);
        });
        return result.join(">>");
    }

    // save data
    $scope.save = function() {
        if($scope.item.id) {
            return productService.update($scope.item);
        }
        return productService.insert($scope.item);
    }

    // save and finish
    $scope.saveAndFinish = function() {
       $state.transitionTo('product');
    }

    // cancel
    $scope.cancel = function() {
        $state.transitionTo('product');
    }

    // delete file
    $scope.deleteFile = function(file) {
        mediaService.remove(file.id);
        $scope._onFileDelete(file);
    }

    // upload
    $scope.upload = function($files) {
        if($files) {
            $files.forEach(function(file) {
                mediaService.upload(file).success($scope._onUploaded);
            });
        }
    }

    // on uploaded
    $scope._onUploaded = function(data) {
        $scope.item.current.medias.push(data.data);
    }

    // on delete file
    $scope._onFileDelete = function(file) {
        var index = $scope.item.current.medias.indexOf(file);
        $scope.item.current.medias.splice(index, 1);
    }

    $scope.editCancel = function() {
        $state.transitionTo('product');
    }

    $scope.reset = function() {
        $scope.item = angular.copy(ProductAttributes);
    }
}

Controller.$inject = [
    '$scope',
    '$rootScope',
    '$state',
    'productService',
    'mediaService',
    '$controller',
    'variantOption',
    'Constants'
];

productModule
.controller('productAddController', Controller);
