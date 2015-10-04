app.controller('HomeController', ['$scope', 'templates', function($scope, templates) {
  templates.success(function(data) {
    console.log(data);
    $scope.templates = data["data"];
  });
}]);
