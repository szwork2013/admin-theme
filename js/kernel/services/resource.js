'use strict';

/**
 * @name            OnhanhKernel
 * @description     resourceService
 */
angular.module('app.kernel')
.factory('resourceService', ['Environment', '$resource',
    function(Environment, $resource) {
        
        return $resource(':shop/card/:id',{
            userId:123, 
            cardId:'@id'
        }, {
          charge: {
              method:'POST', 
              params:{
                  charge:true
                  
              }}
        });
        
        var resourceService = function(name) {
            var api = Environment.settings.api + '/' + name + Environment.settings.prefix;
            return $resource(api+'/:id',{
                id:'@id'
            }, {
              charge: {
                  method:'POST', 
                  params:{
                      charge:true
                      
                  }}
            });
        };
        return resourceService;
    }
]);
