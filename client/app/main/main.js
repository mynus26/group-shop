'use strict';

angular.module('groupShopApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
        }).
      when('/shop', {
		templateUrl: 'app/main/main.html',
		controller: 'MainCtrl'
		}).
	  when('/products/:productId', {
		templateUrl: 'app/main/product.html',
		controller: 'MainCtrl'
		}).
	  when('/cart', {
		templateUrl: 'app/main/shoppingCart.html',
		controller: 'MainCtrl'
		}).
	  otherwise({
		redirectTo: '/shop'
	  });
  });