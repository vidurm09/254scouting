app.controller('HomeController', ['$scope', 'templates', function($scope, templates) {
  templates.success(function(data) {
    $scope.templates = data["data"];
  });
}]);
