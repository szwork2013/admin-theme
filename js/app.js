/**
 * @name            Onhanh
 * @description     App
 */

(function() {
	'use strict';
	angular.module('app', [
	    'app.auth',
	    'app.environment',
	    'app.product',
	    'app.shop',
	    'app.section',
	    'app.reports',
	    'app.kernel',
	    'app.settings',
	    'app.variant',
	    'app.order',
	    'app.dashboard'
	]);
})();
