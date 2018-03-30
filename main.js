

var eShop = angular.module('eShop',[]);

eShop.controller('mainCtrl',function($scope,$http){

$scope.products='';
$scope.title = 'Erply-Eshop';
$scope.cartMessage = 'Add to Cart';

$scope.getProduct = function() {
        console.log("Trying to get product");
    $http({
        method: 'GET',
        url: 'https://erply-challenge.herokuapp.com/list?AUTH=fae7b9f6-6363-45a1-a9c9-3def2dae206d'
      }).then(function succesCallBack(response){
        $scope.res = response.data;
        console.log($scope.res)
        angular.forEach($scope.res, function (result) {
            
        console.log(result.name)
        $scope.name= result.name;
           $scope.price= result.price;
           $scope.image =result.image ;
           $scope.detail=result.description ;
           $scope.stock=result.Instock;
        });
 
          
         
            
          
          

      })
}
    
})