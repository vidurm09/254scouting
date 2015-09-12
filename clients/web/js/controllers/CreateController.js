app.controller('CreateController', ['$scope', 'components', function($scope, components) {
  components.success(function(data) {
    $scope.components = data;
  });
}]);
