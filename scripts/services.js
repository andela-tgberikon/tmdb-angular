angular.module('TMDB.services', [])
  .service('getMovies', ['$http', function($http) {
    return {
      popularMovies: function(movieCallBack) {
        if (TMDBparams.params.page > 1) {
          $http.get(TMDBparams.base2 + TMDBparams.params.api_key + '&page=' + TMDBparams.params.page).then(function(response, request) {
            TMDBparams.storedMovies = response.data;
            return movieCallBack(response.data);
          });
        } else {
          $http.get(TMDBparams.base2 + TMDBparams.params.api_key).then(function(response, request) {
            TMDBparams.storedMovies = response.data;
            return movieCallBack(response.data);
          });
        }
      },
      getOneMovie: function(movieID, movieCallBack, images, trailers, reviews) {
        $http.get(TMDBparams.base1 + movieID + TMDBparams.params.api_key + '&append_to_response=releases,trailers').then(function(response, request) {
          (function() {
            $http.get(TMDBparams.base1 + movieID + '/images' + TMDBparams.params.api_key).then(function(response, request) {
              return images(response.data);
            });
          })();
          (function() {
            $http.get(TMDBparams.base1 + movieID + '/trailers' + TMDBparams.params.api_key).then(function(response, request) {
              return trailers(response.data.youtube);
            });
          })();
          (function() {
            $http.get(TMDBparams.base1 + movieID + '/reviews' + TMDBparams.params.api_key).then(function(response, request) {
              return reviews(response.data.results);
            });
          })();
          return movieCallBack(response.data);
        });
      },
      findMovie: function(movieName, movieCallBack) {
        if (movieName && (TMDBparams.params.page > 1)) {
          $http.get(TMDBparams.baseSearchMovie + TMDBparams.params.api_key + '&query=' + movieName + '&page=' + TMDBparams.params.page).then(function(response, request) {
            TMDBparams.storedMovies = response.data;
            return movieCallBack(response.data);
          });
        } else {
          $http.get(TMDBparams.baseSearchMovie + TMDBparams.params.api_key + '&query=' + movieName).then(function(response, request) {
            if (response.data.total_results === 0) {
              return false;
            } else {
              TMDBparams.storedMovies = response.data;
              return movieCallBack(response.data);
            }
          });
        }
      }
    }
  }]);
