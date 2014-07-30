'use strict';

angular.module('groupShopApp')
  .controller('MainCtrl', function ($scope, $http, $routeParams, DataService, $filter, Auth, shoppingCart, shop) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

        $scope.setRate = function(rate) {

      $scope.rate = (rate != null) ? rate : 0;
    };

       // get shop and cart from service
    $scope.shop = DataService.shop;
    $scope.cart = DataService.cart;
    $scope.user = DataService.user;
    //console.log($scope.user.email);

    // use routing to pick the selected product
    if ($routeParams.productId != null) {
        $scope.product = $scope.shop.getProduct($routeParams.productId);
    }
  });

angular.module('groupShopApp')
  .controller('CarouselCtrl', function ($scope) {
    $scope.myInterval = 2500;
    //var total = $scope.shop.products.length;
    var slides = $scope.slides = [];
    $scope.addSlide = function(num) {
      slides.push({
        image: 'assets/images/full/' + num + '.jpg',
        text: ['Samsung HDTV','SONY Google TV','VIZIO TV', 'Toshiba TV', 'Sharp TV'][slides.length % 5] ,
        id: [1,2,3, 4, 5][slides.length % 5] 
        //         image: $scope.shop.products[i].image,
        // text: $scope.shop.products[i].name ,
        // id: $scope.shop.products[i].id 

      });
    };
    for (var i=0; i<5; i++) {
      $scope.addSlide(i+1);
    }
  });


angular.module('groupShopApp').
controller('TableCtrl', function ($scope, $filter, ngTableParams) {
    var data = shop.products;

    $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        sorting: {
            name: 'asc'     // initial sorting
        }
    }, {
        total: data.length, // length of data
        getData: function($defer, params) {
            // use build-in angular filter
            var orderedData = params.sorting() ?
                                $filter('orderBy')(data, params.orderBy()) :
                                data;

            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
});