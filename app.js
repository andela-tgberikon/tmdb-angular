angular.module('TMDB', [])
  .controller('moviesController', ['$scope', function($scope){
    $scope.yem = function(){
      console.log("Yeet!");
    };
  }]);