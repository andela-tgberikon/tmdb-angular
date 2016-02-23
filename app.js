var TMDB = angular.module('TMDB', []);

TMDB.config(function() {
  return TMDBparams = {
    baseSearchMovie: "https://api.themoviedb.org/3/search/movie",
    base1: 'https://api.themoviedb.org/3/movie/',
    base2: 'https://api.themoviedb.org/3/movie/popular',
    baseUrl: "",
    youtubeUrl: "http://www.youtube.com/embed/",
    baseMovieTrailer: "https://api.themoviedb.org/3/movie/",
    params: { 
      api_key: "?api_key=fb5a22ba28e3a8b761c623cb071fa7a9",
      page: 0
     }
  };
});

TMDB.service('getMovies', ['$http', function($http) {
  return {
    popularMovies: function(movieCallBack, page) {
      $http.get(TMDBparams.base2 + TMDBparams.params.api_key + '&page=' + page).then(function(response, request) {
        return movieCallBack(response.data);
      });
    },
    getOneMovie: function(movieID, movieCallBack) {
      $http.get(TMDBparams.base1 + movieID + TMDBparams.params.api_key).then(function(response, request) {
        return movieCallBack(response.data);
      });
    },
    searchMovie: function(movieName, movieCallBack) {
      $http.get(TMDBparams.baseSearchMovie + TMDBparams.params.api_key + '&query=' + movieName).then(function(response, request) {
        return movieCallBack(response.data);
      });
    }
  }
}]);

TMDB.controller('moviesController', ['$scope', 'getMovies', function($scope, getMovies) {
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
