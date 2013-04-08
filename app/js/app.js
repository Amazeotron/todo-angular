
// Make the console not break IE
if (!window.console) {
  window.console = {};
}
if (!window.console.log) {
  window.console.log = function () {};
}
if (!window.console.error) {
  window.console.error = function () {};
}
if (!window.console.warn) {
  window.console.warn = function () {};
}

// RAF Polyfill
// https://gist.github.com/paulirish/1579671
(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                               || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
}());
  
var todo = angular.module('todo', ['ui', 'todo.services', 'todo.directives', 'todo.controllers']);

todo.services = angular.module('todo.services', []);
todo.directives = angular.module('todo.directives', ['ui']);
todo.controllers = angular.module('todo.controllers', []);

todo.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider.when('/todo', {templateUrl: '/partials/todo.html', controller: 'todoController'});
  $routeProvider.otherwise({redirectTo: '/todo'});
  $locationProvider.html5Mode(false).hashPrefix('!');
}]);