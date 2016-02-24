angular.module('TMDB.services', [])
  .service('getMovies', ['$http', function($http) {
    return {
      popularMovies: function(movieCallBack) {
        if (TMDBparams.params.page > 1) {
          console.log(TMDBparams.storedMovies, 'After being paginated');
          $http.get(TMDBparams.base2 + TMDBparams.params.api_key + '&page=' + TMDBparams.params.page).then(function(response, request) {
            TMDBparams.storedMovies = response.data;
            return movieCallBack(response.data);
          });
        } else {
          $http.get(TMDBparams.base2 + TMDBparams.params.api_key).then(function(response, request) {
            TMDBparams.storedMovies = response.data;
          console.log(TMDBparams.storedMovies, 'Before being paginated');
            return movieCallBack(response.data);
          });
        }
      },
      getOneMovie: function(movieID, movieCallBack) {
        $http.get(TMDBparams.base1 + movieID + TMDBparams.params.api_key).then(function(response, request) {
          console.log(TMDBparams.storedMovies, 'This is storedMovies');
          return movieCallBack(response.data);
        });
      },
      findMovie: function(movieName, movieCallBack) {
        $http.get(TMDBparams.baseSearchMovie + TMDBparams.params.api_key + '&query=' + movieName).then(function(response, request) {
          if (response.data.total_results == 0) {
            console.log(false, "It's a lie, no movie typed");
            return false;
          } else {
            console.log(response.data, 'from findMovie');
            TMDBparams.storedMovies = response.data;
            return movieCallBack(response.data);
          }
        });
      }
    }
  }]);
