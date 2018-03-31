var eShop = angular.module('eShop',['ui.bootstrap']);

eShop.controller('mainCtrl',function($scope,$http){
  
$scope.products='';
$scope.title = 'Erply-Eshop';
$scope.cartMessage = 'Add to Cart';
$scope.price = 20;

$scope.getProduct = function() {
        console.log("Trying to get product");
    $http({
        method: 'GET',
        url: 'https://erply-challenge.herokuapp.com/list?AUTH=fae7b9f6-6363-45a1-a9c9-3def2dae206d'
      }).then(function succesCallBack(response){
        $scope.res = response.data;
        console.log($scope.res)
       
        $scope.filtered = $scope.res.filter((a) =>{
            return a.id == 1;
        });
        console.log($scope.filtered)
        angular.forEach($scope.res, function (result) {
          
        console.log("NAME: "+result.name)
        $scope.name= result.name;
       
           $scope.price= result.price;
           $scope.image =result.image ;
           $scope.detail=result.description ;
           $scope.stock=result.Instock;
        }); 
    })
}
$scope.getProductDetails = function() {
    console.log("getting details");
$http({
    method: 'GET',
    url: 'https://erply-challenge.herokuapp.com/list?AUTH=fae7b9f6-6363-45a1-a9c9-3def2dae206d'
  }).then(function succesCallBack(response){
    $scope.res = response.data;
    console.log( $scope.res);
    var i = 0;
    for(var i=1; i< $scope.res.length;i++) {
        if ($scope.res.id[i] == id){
            return $scope.res.description;
        }
    }
 
})
}
})