angular.module('TMDB.services', [])
  .service('getMovies', ['$http', function($http) {
    return {
      popularMovies: function(movieCallBack) {
        $http.get(TMDBparams.base2 + TMDBparams.params.api_key).then(function(response, request) {
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
