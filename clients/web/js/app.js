angular.module('ScoutingApp', ['ngRoute']);
var app = angular.module('ScoutingApp', ['ngRoute']);
app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'HomeController',
      templateUrl: 'views/home.html'
    })
    .when('/template/:id', {
      controller: 'TemplateController',
      templateUrl: 'views/template.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});
