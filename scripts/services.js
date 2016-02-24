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
      findMovie: function(movieName, movieCallBack) {
        $http.get(TMDBparams.baseSearchMovie + TMDBparams.params.api_key + '&query=' + movieName).then(function(response, request) {
          if (response.data.total_results == 0) {
            console.log(false, "It's a lie, no movie typed");
            return false;
          } else {
            return movieCallBack(response.data);
          }
        });
      }
    }
  }]);
