app.controller('TemplateController', ['$scope', 'templates', '$routeParams', function($scope, templates, $routeParams) {
  templates.success(function(data) {
    $scope.template = data[$routeParams.id];
  });
}]);
