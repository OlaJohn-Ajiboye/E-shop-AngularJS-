'use strict';

angular
  .module('eShop.products', ['ngRoute','ngCookies'])

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

      $scope.getProducts = function() {
        console.log('Trying to get product');
        $http({
          method: 'GET',
          url:
            'https://erply-challenge.herokuapp.com/list?AUTH=fae7b9f6-6363-45a1-a9c9-3def2dae206d',
        }).then(function succesCallBack(response) {
          $scope.res = response.data;
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
    function($scope, $http, $routeParams) {
      $scope.title = 'Product Details';

      $scope.productId =  $routeParams.productId;

      $scope.viewProduct = function() {
        $http({
          method: 'GET',
          url:
            'https://erply-challenge.herokuapp.com/list?AUTH=fae7b9f6-6363-45a1-a9c9-3def2dae206d',
        }).then(function succesCallBack(response) {
          $scope.res = response.data;
         
          $scope.filtered = $scope.res.filter(a => {
            return a.id == $scope.productId;
          });

          $scope.productDetails =$scope.filtered[0];
        });
        
      }; 
    
    },
    
  ])
  .controller('cartCtrl', [
    '$scope',
    '$http',
    '$routeParams',
    '$cookies',
    function($scope, $http,$cookies, $routeParams) {
      $scope.title = 'Product Details';

      $scope.productId =  $routeParams.productId;

      $scope.viewProduct = function() {
        $http({
          method: 'GET',
          url:
            'https://erply-challenge.herokuapp.com/list?AUTH=fae7b9f6-6363-45a1-a9c9-3def2dae206d',
        }).then(function succesCallBack(response) {
          $scope.res = response.data;
          if ($scope.cart.length === 0){
            $scope.res.count = 1;
            $scope.cart.push( $scope.res);
          } else {
            var repeat = false;
            for(var i = 0; i< $scope.cart.length; i++){
              if($scope.cart[i].id === $routeParams.productId){
                repeat = true;
                $scope.cart[i].count +=1;
              }
            }
            if (!repeat) {
              product.count = 1;
               $scope.cart.push( $scope.res);	
            }
          }
         
        
        });
        
      }; 
    
    },
    
  ]);

