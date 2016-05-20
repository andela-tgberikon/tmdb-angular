angular.module('TMDB.controllers', [])
  .controller('moviesController', ['$scope', 'getMovies', function($scope, getMovies) {
    'use strict';
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
        $scope.pageNumber = '';
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
    }
    $scope.oneMovie = function(movie, trailers, reviews) {
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
      }, function(trailers) {
        console.log(trailers, 'these are the controller trailers');
      }, function(reviews) {
        console.log(reviews, 'these are the controller reviews');
      });
    };

    $scope.popularMovies = paginateObject.getPopularMovies();

    $scope.search = function(movieName) {
      if (angular.isUndefined(movieName)) {
        return false;
      } else {
        console.log(movieName);
        TMDBparams.searchMovieName = movieName;
        getMovies.findMovie(movieName, function(movieName) {
          // console.log(movieName, 'this is movieName');
          paginateObject.setDisplay();
          $scope.displayMovies = movieName.results;
          $scope.currentPage = movieName.page;
          // console.log(movieName, 'this is controller search');
          $scope.totalPages = TMDBparams.storedMovies.total_pages;
          // $scope.movieName = '';
          // TMDBparams.searchMovieName = '';

        });
        $scope.movieName = '';

        // console.log(movieName.results, 'this is the stored page');
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
      // console.log($scope.pageNumber, 'this is before the if');
      if ((angular.isUndefined(pageNumber)) || (pageNumber > TMDBparams.storedMovies.total_pages)) {
        // console.log(pageNumber, 'return false');
        return false;
      } else {
        //do the api call
        console.log( 'do the api call');
        if (!TMDBparams.searchMovieName) {
          // console.log(pageNumber, 'pageNumber');
          TMDBparams.storedMovies.page = pageNumber;
          paginateObject.loadObjects();
        } else {
          console.log(pageNumber, 'pageNumber');
          TMDBparams.storedMovies.page = pageNumber;
          // $scope.pageNumber = '';
          paginateObject.loadSearchObjects();
        }
      }
    }

    $scope.backToSearch = function() {
      $scope.displayMovies = TMDBparams.storedMovies.results;
      paginateObject.setDisplay();
    }
  }]);
