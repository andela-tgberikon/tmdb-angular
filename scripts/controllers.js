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
    $scope.nextPage = function() {
      if ((TMDBparams.storedMovies.page + 1) > (TMDBparams.storedMovies.total_pages)) {
        return false;
      } else {
        console.log(TMDBparams.storedMovies.page, 'This is the current page');
        TMDBparams.storedMovies.page = TMDBparams.storedMovies.page + 1;
        TMDBparams.params.page = TMDBparams.storedMovies.page;
        console.log(TMDBparams.params.page);
        console.log(TMDBparams.storedMovies, 'nextPage storedMovies');
        getMovies.popularMovies(function(movies) {
          $scope.popular = true;
          $scope.showcase = false;
          $scope.displayMovies = movies.results;
        });
        TMDBparams.storedMovies = '';
      }
    };
    $scope.previousPage = function() {
      if ((TMDBparams.storedMovies.page - 1) == 0) {
        console.log('Exceeded the starting number');
        return false;
      } else {
        console.log(TMDBparams.storedMovies.page - 1, 'Going back one page');
        console.log(TMDBparams.storedMovies, 'this is TMDBparams.storedMovies');
         TMDBparams.storedMovies.page = TMDBparams.storedMovies.page - 1;
         TMDBparams.params.page = TMDBparams.storedMovies.page;
         console.log(TMDBparams.storedMovies, 'previousPage storedMovies');
         getMovies.popularMovies(function(movies) {
          $scope.popular = true;
          $scope.showcase = false;
          $scope.displayMovies = movies.results;
        });
         TMDBparams.storedMovies = '';
      }
    };
    $scope.backToSearch = function() {
      console.log(TMDBparams.storedMovies, 'this is the storedMovies from backToSearch');
      $scope.displayMovies = TMDBparams.storedMovies.results;
      $scope.popular = true;
      $scope.showcase = false;
      $scope.movieReel = '';
      $scope.movie = '';
    }
  }]);
