angular.module('TMDB.directives', [])
  .directive('tmdbEnter', function() {
    return function(scope, element, attrs) {
      element.bind("keydown keypress", function(event) {
        if (event.which === 13) {
          scope.$apply(function() {
            scope.$eval(attrs.tmdbEnter);
            scope.$on('$destroy', function() {
              element.unbind('keydown');
            });
          });
          event.preventDefault();
        }
      });
    };
  });
