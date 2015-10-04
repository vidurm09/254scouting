/*angular.module('ScoutingApp', ['ngRoute']);*/
var app = angular.module('ScoutingApp', ['ngRoute', 'ngSanitize']);
app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'HomeController',
      templateUrl: 'views/home.html'
    })
    .when('/template/create', {
      controller: 'CreateController',
      templateUrl: 'views/create.html'
    })
    .when('/template/:id', {
      controller: 'TemplateController',
      templateUrl: 'views/template.html'
    })
    .when('/event/:id', {
      controller: 'ScoutController',
      templateUrl: 'views/scout.html'
    })
    .when('/event', {
      controller: 'EventController',
      templateUrl: 'views/event.html'
    })
    .when('/event/scout/:eventkey/:scoutname', {
      controller: 'ScoutController',
      templateUrl: 'views/scout.html'
    })
    .when('/event/scout/:eventkey', {
      controller: 'ReviewController',
      templateUrl: 'views/review.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});
app.filter('to_trusted', ['$sce', function($sce){
  return function(text) {
    return $sce.trustAsHtml(text);
  };
}]);
