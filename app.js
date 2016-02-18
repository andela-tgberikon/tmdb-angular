angular.module('TMDB', [])
  // .service('movieService', ['$http', function($http){
  //   return {
  //     popular: function() {
  //       $http.get(x).success(function(res, req){
  //         console.log('Success response: ', res);
  //       }).error(function(res, req){
  //         console.log('Error response: ', res);
  //       });
  //     }
  //   }
  // }])
  .controller('moviesController', ['$http', '$scope', function($http, $scope) {
    var TMDBparams = {
      baseSearchMovie: "https://api.themoviedb.org/3/search/movie",
      base2: "https://api.themoviedb.org/3/movie/popular",
      baseUrl: "",
      youtubeUrl: "http://www.youtube.com/embed/",
      baseMovieTrailer: "https://api.themoviedb.org/3/movie/",
      params: { api_key: "?api_key=fb5a22ba28e3a8b761c623cb071fa7a9" }
    };
    $scope.yem = function() {
      console.log("Yeet!", TMDBparams.base2 + TMDBparams.params.api_key);
    };
    //movieService.popular(TMDBparams.base2 + TMDBparams.params.api_key);
    $scope.popularMovies = function() {
      $http.get('TMDBparams.base2 + TMDBparams.params.api_key').success(function(res, req){
        console.log('This is the success response: ', res);
        console.log('This is the success request: ', req)
      }).error(function(res, req){
        console.log('This is the error response: ', res);
        console.log('This is the error request: ', req)
      })
    }
  }]);
