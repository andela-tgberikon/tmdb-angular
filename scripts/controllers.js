angular.module('TMDB.controllers', [])
  .controller('moviesController', ['$scope', 'getMovies', function($scope, getMovies) {
    $scope.oneMovie = function(movie) {
      getMovies.getOneMovie(movie, function(movie) {
        $scope.showcase = true;
        $scope.movieReel = movie;
        $scope.displayMovies = '';
      });
    };
    $scope.popularMovies = getMovies.popularMovies(function(movies) {
      $scope.popular = true;
      $scope.showcase = false;
      $scope.displayMovies = movies.results;
    });
    
    $scope.search = function(movie) {
      if (angular.isUndefined(movie)) {
        return false;
      } else {
        getMovies.findMovie(movie, function(movie) {
          $scope.popular = true;
          $scope.showcase = false;
          $scope.displayMovies = movie.results;
          $scope.movie = '';
          $scope.movieReel = '';
        });
      }
    };
  }]);
