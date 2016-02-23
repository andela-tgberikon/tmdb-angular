angular.module('TMDB.controllers', [])
  .controller('moviesController', ['$scope', 'getMovies', function($scope, getMovies) {
    $scope.oneMovie = function(movie) {
      getMovies.getOneMovie(movie, function(movie) {
        console.log(movie, 'This is getOneMovie');
      });
    };
    $scope.popularMovies = getMovies.popularMovies(function(movies) {
      console.log(movies.results, 'This is popularMovies');
      $scope.trendingMovies = movies.results;
    });
    $scope.search = function(movie) {
      console.log(movie)
      getMovies.searchMovie(movie, function(movie) {
        console.log(movie, 'THis is the movie');
      });
    }
  }]);
