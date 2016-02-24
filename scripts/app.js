angular.module('TMDB', [
  'TMDB.controllers',
  'TMDB.services',
  'TMDB.directives',
  'ui.router'
  ])
.config(function() {
  return TMDBparams = {
    storedMovies: '',
    baseSearchMovie: "https://api.themoviedb.org/3/search/movie",
    base1: 'https://api.themoviedb.org/3/movie/',
    base2: 'https://api.themoviedb.org/3/movie/popular',
    baseUrl: "",
    youtubeUrl: "http://www.youtube.com/embed/",
    baseMovieTrailer: "https://api.themoviedb.org/3/movie/",
    params: { 
      api_key: "?api_key=fb5a22ba28e3a8b761c623cb071fa7a9",
      page: ''
     }
  };
});