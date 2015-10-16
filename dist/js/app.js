"use strict";window.angular.module("app",["ui.router","app.environment","app.kernel","app.auth","app.dashboard","app.product","app.section"]).run(["$rootScope","$state","$stateParams",function(a,b,c){a.$state=b,a.$stateParams=c}]),angular.module("app.environment",[]).service("Environment",function(){var a=document.domain.replace("admin","api");return{settings:{api:"http://"+a+"/backend/api",domain:"http://"+a,pageTitle:"Onhanh - open source project | Admin",locale:{primary:"en",available:["ru","es","en"]}},currentLocale:function(){var a=window.location.pathname.replace(/^\/([^\/]*).*$/,"$1");return-1==this.settings.locale.available.indexOf(a)&&(a=this.settings.locale.primary),a}}}),function(a,b,c){var d=b.module("app.kernel",[]);d.config(["$provide","$urlRouterProvider",function(a,b){b.otherwise(function(a,b){var c=a.get("$state");c.transitionTo("home")})}]),b.module("app.kernel").controller("abstractDetailController",["$controller","$scope","itemService","$stateParams","$state","notify",function(a,d,e,f,g,h){d.detail={id:f.id,name:f.name},d.item={};var i=function(a){b.isUndefined(a.message)===!1&&h("Response:"+a.code+" Message:"+a.message),b.isUndefined(a.errors)===!1&&b.forEach(a.errors,function(b,c){h("Response: "+a.code+' "'+c+'": '+b)})};d.detail.id!==c&&e.get(d.detail.id).success(function(a,b){d.item=a}).error(function(a,b){404==a.error.code?(g.transitionTo("home"),console.log(a),h("404 Noting found")):i(a)}),d.editSave=function(a){d.details.id!==c&&e.save(d.item).success(function(a,b){h(d.route.name+" has been saved"),console.log(a)}).error(function(a,b){i(a)}),d.details.id===c&&e.create(d.item).success(function(a,b){h(d.route.name+" was added"),g.transitionTo(d.route.edit,{id:a.id})}).error(function(a,b){i(a)}),a&&a()},d.editSaveAndExit=function(){e.save(d.item).success(function(a,b){h(d.route.name+" has been saved"),g.transitionTo(d.route.collection)}).error(function(a,b){i(a)})},d.editCancel=function(){g.transitionTo(d.route.collection)},d.editDelete=function(){e.remove(d.detail.id).success(function(a,b){h(d.route.name+" has been deleted"),g.transitionTo(d.route.collection)}).error(function(a,b){i(a)})}}]),b.module("app.kernel").factory("resourceService",["$http","Environment",function(a,b){var c=function(a){this.resource=a};return c.prototype={getCollection:function(c,d){var e=b.settings.api+"/"+this.resource+"/?limit="+c.pageLimit+"&current="+d+"&filter="+c.filter;return a.get(e)},remove:function(c){var d=b.settings.api+"/"+this.resource+"/"+c;return a["delete"](d)},save:function(c){var d=b.settings.api+"/"+this.resource+"/"+c.id;return a({method:"PUT",url:d,data:c})},create:function(c){var d=b.settings.api+"/"+this.resource;return a({method:"POST",url:d,data:c})}},c}])}(window,window.angular),function(a,b,c){var d=b.module("app.product",[]);d.config(["$stateProvider",function(a){a.state("product",{url:"/product",controller:"productController",templateUrl:"/web/product/list.html"}).state("productNew",{url:"/product/new",controller:"productAddController",templateUrl:"/web/product/add.html"})}]),d.controller("productAddController",["$location","$scope","$rootScope",function(a,b,c){}]),d.controller("productController",["$location","$scope","$rootScope",function(a,b,c){}])}(window,window.angular),function(a,b,c){b.module("app.auth",[])}(window,window.angular),function(a,b,c){b.module("app.section",[])}(window,window.angular),function(a,b,c){b.module("app.order",[])}(window,window.angular),function(a,b,c){b.module("app.shop",[])}(window,window.angular),function(a,b,c){b.module("app.variant",[])}(window,window.angular),function(a,b,c){b.module("app.reports",[])}(window,window.angular),function(a,b,c){var d=b.module("app.dashboard",[]);d.config(["$stateProvider",function(a){a.state("home",{url:"/home",controller:"dashboardController",templateUrl:"/web/dashboard/dashboard.html"})}]),d.controller("dashboardController",["$location","$scope","$rootScope",function(a,b,c){}])}(window,window.angular),jQuery(document).ready(function(){window.angular.bootstrap(document,["app"])});
//# sourceMappingURL=app.js.map