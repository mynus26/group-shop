'use strict';

angular.module('groupShopApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

    // create a data service that provides a shop and a shopping cart that
  // will be shared by all views (instead of creating fresh ones for each view).
  .factory("DataService", function (shoppingCart, shop) {

      var myUser = {};
      // create shop
      var myShop = new shop();

      // create shopping cart
      var myCart = new shoppingCart("GroupShop", "");

      // enable PayPal checkout
      // note: the second parameter identifies the merchant; in order to use the 
      // shopping cart with PayPal, you have to create a merchant account with 
      // PayPal. You can do that here:
      // https://www.paypal.com/webapps/mpp/merchant
      myCart.addCheckoutParameters("PayPal", "paypaluser@youremail.com");

      // enable Google Wallet checkout
      // note: the second parameter identifies the merchant; in order to use the 
      // shopping cart with Google Wallet, you have to create a merchant account with 
      // Google. You can do that here:
      // https://developers.google.com/commerce/wallet/digital/training/getting-started/merchant-setup
      myCart.addCheckoutParameters("Google", "xxxxxxx",
          {
              ship_method_name_1: "UPS Next Day Air",
              ship_method_price_1: "20.00",
              ship_method_currency_1: "USD",
              ship_method_name_2: "UPS Ground",
              ship_method_price_2: "15.00",
              ship_method_currency_2: "USD"
          }
      );

      // return data object with shop and cart
      return {
          shop: myShop,
          cart: myCart,
          user: myUser,
      };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });
