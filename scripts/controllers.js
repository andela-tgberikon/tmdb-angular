angular.module('TMDB.controllers', [])
  .controller('moviesController', ['$scope', 'getMovies', '$mdToast', function($scope, getMovies, $mdToast) {

    var paginateObject = {
      getPopularMovies: function() {
        getMovies.popularMovies(function(movies) {
          $scope.popular = true;
          $scope.buttons = true;
          $scope.showcase = false;
          $scope.displayMovies = movies.results;
          $scope.currentPage = TMDBparams.storedMovies.page;
          $scope.totalPages = TMDBparams.storedMovies.total_pages;
          console.log(movies.results);
        });
      },
      loadObjects: function() {
        TMDBparams.params.page = TMDBparams.storedMovies.page;
        TMDBparams.storedMovies = '';
        paginateObject.getPopularMovies();
      },
      loadSearchObjects: function() {
        TMDBparams.params.page = TMDBparams.storedMovies.page;
        getMovies.findMovie(TMDBparams.searchMovieName, function(movieName) {
          paginateObject.setDisplay();
          $scope.displayMovies = movieName.results;
          $scope.movieName = '';
        });
      },
      setDisplay: function() {
        $scope.popular = true;
        $scope.buttons = true;
        $scope.showcase = false;
        $scope.movieReel = '';
        $scope.backdrops = '';
        $scope.posters = '';
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
  
      }, function(images) {
        $scope.posters = images.posters;
        $scope.backdrops = images.backdrops;
        console.log(images.posters, '<-- these are poster, and these are backdrops --> ', images.backdrops);
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
          console.log(TMDBparams.storedMovies.page, 'this is the currentPage');
          console.log(TMDBparams.storedMovies.total_pages, 'this is the total_pages');
          // $scope.currentPage = TMDBparams.storedMovies.page;
          $scope.totalPages = TMDBparams.storedMovies.total_pages;
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
          TMDBparams.storedMovies.page = TMDBparams.storedMovies.page + 1;
          paginateObject.loadSearchObjects();
        }
      }
    };

    $scope.previousPage = function() {
      if ((TMDBparams.storedMovies.page - 1) === 0) {
        return false;
      } else {
        if (!TMDBparams.searchMovieName) {
          TMDBparams.storedMovies.page = TMDBparams.storedMovies.page - 1;
          paginateObject.loadObjects();
        } else {
          TMDBparams.storedMovies.page = TMDBparams.storedMovies.page - 1;
          paginateObject.loadSearchObjects();
        };
      }
    };

    $scope.lastPage = function() {
      if (!TMDBparams.searchMovieName) {
        TMDBparams.storedMovies.page = TMDBparams.storedMovies.total_pages;
        paginateObject.loadObjects();
      } else {
        TMDBparams.storedMovies.page = TMDBparams.storedMovies.total_pages;
        paginateObject.loadSearchObjects();
      }
    };

    $scope.firstPage = function() {
      if (!TMDBparams.searchMovieName) {
        TMDBparams.storedMovies.page = 1;
        paginateObject.loadObjects();
      } else {
        TMDBparams.storedMovies.page = 1;
        paginateObject.loadSearchObjects();
      }
    };

    $scope.goToPage = function(pageNumber) {
      console.log(pageNumber);
      if (!angular.isUndefined(pageNumber)) {
        if (!TMDBparams.searchMovieName) {
          TMDBparams.storedMovies.page = pageNumber;
          paginateObject.loadObjects();
        } else {
          TMDBparams.storedMovies.page = pageNumber;
          paginateObject.loadSearchObjects();
        }
      } else {
        console.log('return false');
        return false;
      }
    }

    $scope.backToSearch = function() {
      $scope.displayMovies = TMDBparams.storedMovies.results;
      paginateObject.setDisplay();
    }
  }]);
