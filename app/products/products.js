'use strict';

angular
  .module('eShop.products', ['ngRoute', 'ngCookies'])

  .config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/products', {
          templateUrl: 'products/products.html',
          controller: 'ProductsCtrl',
        })
        .when('/product-details/:productId', {
          templateUrl: 'products/product.details.html',
          controller: 'ProductDetailsCtrl',
        });
    },
  ])

  .controller('ProductsCtrl', [
    '$scope',
    '$http',
    function($scope, $http) {
      $scope.products = '';
      $scope.title = 'Erply-Eshop';
      $scope.cartMessage = 'Add to Cart';
      $scope.price = 20;
      let api =
        'https://erply-challenge.herokuapp.com/list?AUTH=fae7b9f6-6363-45a1-a9c9-3def2dae206d';
      $scope.getProducts = function() {
        console.log('Trying to get product');
        $http({
          method: 'GET',
          url: api,
        }).then(function succesCallBack(response) {
         $scope.products = response.data;
          angular.forEach($scope.res, function(result) {
            $scope.name = result.name;
            $scope.price = result.price;
            $scope.image = result.image;
            $scope.detail = result.description;
            $scope.stock = result.Instock;
          });
        });
      };
    },
  ])

  .controller('ProductDetailsCtrl', [
    '$scope',
    '$http',
    '$routeParams',
    '$cookies',
    function($scope, $http, $routeParams, $cookies) {
      $scope.title = 'Product Details';
      $scope.cart = [];
      $scope.total = 0;
    
      let api =
        'https://erply-challenge.herokuapp.com/list?AUTH=fae7b9f6-6363-45a1-a9c9-3def2dae206d';
      $scope.productId = $routeParams.productId;
     
      $scope.viewProduct = function() {
        $http({
          method: 'GET',
          url: api,
        }).then(function succesCallBack(response) {
         $scope.products = response.data;
          
        
          $scope.filtered =$scope.products.filter(a => {
            return a.id == $scope.productId;
          });

          $scope.productDetails = $scope.filtered[0];
          console.log($scope.filtered[0]);
          $scope.products = response.data;
          $scope.addItemToCart = function(product)  {
            
            console.log(product); 
          
          };
            // if ($scope.cart.length === 0) {
            //   product.count = 1;
            //   $scope.cart.push(product);
            // } else {
            //   var repeat = false;
            //   for (var i = 0; i < $scope.cart.length; i++) {
            //     if ($scope.cart[i].id === product.id) {
            //       repeat = true;
            //       $scope.cart[i].count += 1;
            //     }
            //   }
            //   if (!repeat) {
            //     product.count = 1;
            //     $scope.cart.push(product);
            //   }
            // }
            // var expireDate = new Date();
            //   expireDate.setDate(expireDate.getDate() + 1);
            //   $cookies.putObject('cart', $scope.cart, {expires: expireDate});
            //   $scope.cart = $cookies.getObject('cart');

            //   $scope.total += parseFloat(product.price);
            //   $cookies.put('total', $scope.total, {expires: expireDate});
        
          $scope.removeItemCart = function(product) {
            if (product.count > 1) {
              product.count -= 1;
              var expireDate = new Date();
              expireDate.setDate(expireDate.getDate() + 1);
              $cookies.putObject('cart', $scope.cart, {expires: expireDate});
              $scope.cart = $cookies.getObject('cart');
            } else if (product.count === 1) {
              var index = $scope.cart.indexOf(product);
              $scope.cart.splice(index, 1);
              expireDate = new Date();
              expireDate.setDate(expireDate.getDate() + 1);
              $cookies.putObject('cart', $scope.cart, {expires: expireDate});
              $scope.cart = $cookies.getObject('cart');
            }

              $scope.total -= parseFloat(product.price);
              $cookies.put('total', $scope.total, {expires: expireDate});
          };
        });
      };
    },
  ]);
