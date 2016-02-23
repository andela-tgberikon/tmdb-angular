var TMDB = angular.module('TMDB', []);

TMDB.config(function($httpProvider) {
  return TMDBparams = {
    baseSearchMovie: "https://api.themoviedb.org/3/search/movie",
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

TMDB.controller('moviesController', ['$http', '$scope', function($http, $scope) {
  $scope.yem = function() {
    console.log("Yeet!", TMDBparams.base2);
    myMovies.load();
  };
  $scope.popularMovies = function() {
    $http.get(TMDBparams.base2 + TMDBparams.params.api_key).then(function(res, req) {
      console.log('This is the success response: ', res);
      console.log('This is the success request: ', req)
    });
  }
}]);
