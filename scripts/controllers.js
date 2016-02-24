angular.module('TMDB.controllers', [])
  .controller('moviesController', ['$scope', 'getMovies', function($scope, getMovies) {
    var paginateObject = {
      getPopularMovies: function() {
        getMovies.popularMovies(function(movies) {
          $scope.popular = true;
          $scope.showcase = false;
          $scope.displayMovies = movies.results;
        });
      }
    }
    $scope.oneMovie = function(movie) {
      getMovies.getOneMovie(movie, function(movie) {
        /* The trailer URL is a different API call which would produce the youtube link that we would have to embed 
            in an iFrame or a html5 video player, preferrably an overlay.
            Also, reviews are a separate API call, which would be added to properties of the video.
        */
        $scope.showcase = true;
        $scope.movieReel = movie;
        $scope.displayMovies = '';
      });
    };
    $scope.popularMovies = paginateObject.getPopularMovies();
    $scope.search = function(movieName) {
      if (angular.isUndefined(movieName)) {
        return false;
      } else {
        getMovies.findMovie(movieName, function(movieName) {
          $scope.popular = true;
          $scope.showcase = false;
          $scope.displayMovies = movieName.results;
          $scope.movieName = '';
          $scope.movieReel = '';
        });
      }
    };

    $scope.nextPage = function() {
      if ((TMDBparams.storedMovies.page + 1) > (TMDBparams.storedMovies.total_pages)) {
        return false;
      } else {
        TMDBparams.storedMovies.page = TMDBparams.storedMovies.page + 1;
        TMDBparams.params.page = TMDBparams.storedMovies.page;
        paginateObject.getPopularMovies();
        TMDBparams.storedMovies = '';
      }
    };
    $scope.previousPage = function() {
      if ((TMDBparams.storedMovies.page - 1) == 0) {
        return false;
      } else {
        TMDBparams.storedMovies.page = TMDBparams.storedMovies.page - 1;
        TMDBparams.params.page = TMDBparams.storedMovies.page;
        paginateObject.getPopularMovies();
        TMDBparams.storedMovies = '';
      }
    };
    $scope.backToSearch = function() {
      $scope.displayMovies = TMDBparams.storedMovies.results;
      $scope.popular = true;
      $scope.showcase = false;
      $scope.movieReel = '';
    }
  }]);
