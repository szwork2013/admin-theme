'use strict';
/**
 * @name            Onhanh
 * @description     App
 */

window.angular.module('app', [
    
    //Core module
    'ui.router',
    
    //App module
    'app.environment',
    'app.kernel',
    'app.auth',
    'app.dashboard',
    'app.product',
    'app.section'
]).run(['$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {

        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
        // to active whenever 'contacts.list' or one of its decendents is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
  ]);
