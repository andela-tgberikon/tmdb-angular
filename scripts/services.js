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
      getOneMovie: function(movieID, movieCallBack, images) {
        $http.get(TMDBparams.base1 + movieID + TMDBparams.params.api_key + '&append_to_response=releases,trailers').then(function(response, request) {
          (function() {
            $http.get(TMDBparams.base1 + movieID + '/images' + TMDBparams.params.api_key).then(function(response, request) {
              return images(response.data);
            });
          })();
          return movieCallBack(response.data);
        });
      },
      findMovie: function(movieName, movieCallBack) {
        if (movieName && (TMDBparams.params.page > 1)) {
          console.log(movieName, 'paginate page');
          $http.get(TMDBparams.baseSearchMovie + TMDBparams.params.api_key + '&query=' + movieName + '&page=' + TMDBparams.params.page).then(function(response, request) {
            console.log(response.data, 'this is the paginated findMovie');
            TMDBparams.storedMovies = response.data;
            return movieCallBack(response.data);
          });
        } else {
          console.log(movieName, 'paginate your ass mofo');
          $http.get(TMDBparams.baseSearchMovie + TMDBparams.params.api_key + '&query=' + movieName).then(function(response, request) {
            if (response.data.total_results === 0) {
              return false;
            } else {
              console.log(response.data, ' This is findMovie');
              TMDBparams.storedMovies = response.data;
              return movieCallBack(response.data);
            }
          });
        }
      }
    }
  }]);
