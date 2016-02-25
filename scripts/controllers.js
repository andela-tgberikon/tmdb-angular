angular.module('TMDB.controllers', [])
  .controller('moviesController', ['$scope', 'getMovies', function($scope, getMovies) {

    var paginateObject = {
      getPopularMovies: function() {
        getMovies.popularMovies(function(movies) {
          $scope.popular = true;
          $scope.buttons = true;
          $scope.showcase = false;
          $scope.displayMovies = movies.results;
          $scope.currentPage = TMDBparams.storedMovies.page;
          $scope.totalPages = TMDBparams.storedMovies.total_pages;
        });
      },
      loadObjects: function() {
        TMDBparams.params.page = TMDBparams.storedMovies.page;
        TMDBparams.storedMovies = '';
        paginateObject.getPopularMovies();
      },
      setDisplay: function() {
        $scope.popular = true;
        $scope.buttons = true;
        $scope.showcase = false;
        $scope.movieReel = '';
      }
    };

    $scope.oneMovie = function(movie) {
      getMovies.getOneMovie(movie, function(movie) {
        /* The trailer URL is a different API call which would produce the youtube link that we would have to embed 
            in an iFrame or a html5 video player, preferrably an overlay.
            Also, reviews are a separate API call, which would be added to properties of the video.
        */
        $scope.showcase = true;
        $scope.movieReel = movie;
        $scope.displayMovies = '';
        $scope.buttons = false;
      });
    };

    $scope.popularMovies = paginateObject.getPopularMovies();

    $scope.search = function(movieName) {
      if (angular.isUndefined(movieName)) {
        return false;
      } else {
        TMDBparams.searchMovieName = movieName;
        getMovies.findMovie(movieName, function(movieName) {
          paginateObject.setDisplay();
          $scope.displayMovies = movieName.results;
        });
          $scope.movieName = '';
      }
    };

    $scope.nextPage = function() {
      if ((TMDBparams.storedMovies.page + 1) > (TMDBparams.storedMovies.total_pages)) {
        return false;
      } else {
        if (!TMDBparams.searchMovieName) {
          TMDBparams.storedMovies.page = TMDBparams.storedMovies.page + 1;
          paginateObject.loadObjects();
        } else {
          //findMovie API call
          console.log(TMDBparams.searchMovieName, ' Call the findMovie method now');
          //var movieName = TMDBparams.searchMovieName;
          console.log(TMDBparams.searchMovieName, 'this is the movieName');
          TMDBparams.storedMovies.page = TMDBparams.storedMovies.page + 1;
          TMDBparams.params.page = TMDBparams.storedMovies.page;
          getMovies.findMovie(TMDBparams.searchMovieName, function(movieName) {
            paginateObject.setDisplay();
            $scope.displayMovies = movieName.results;
            $scope.movieName = '';
          });
        }
      }
    };

    $scope.previousPage = function() {
      if ((TMDBparams.storedMovies.page - 1) === 0) {
        return false;
      } else {
        //if (!TMDBparams.searchMovieName) {} else {}
        TMDBparams.storedMovies.page = TMDBparams.storedMovies.page - 1;
        paginateObject.loadObjects();
      }
    };

    $scope.lastPage = function() {
      TMDBparams.storedMovies.page = TMDBparams.storedMovies.total_pages;
      paginateObject.loadObjects();
    };

    $scope.firstPage = function() {
      TMDBparams.storedMovies.page = 1;
      paginateObject.loadObjects();
    };

    $scope.goToPage = function(pageNumber) {
      console.log(pageNumber);
      TMDBparams.storedMovies.page = pageNumber;
      paginateObject.loadObjects();
    }

    $scope.backToSearch = function() {
      $scope.displayMovies = TMDBparams.storedMovies.results;
      paginateObject.setDisplay();
    }
  }]);
