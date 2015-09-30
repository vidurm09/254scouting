app.controller('TemplateController', ['$scope', 'templates', '$routeParams', function($scope, templates, $routeParams) {
  templates.success(function(data) {
    data = data["data"];
    $scope.template = data[$routeParams.id];

    for(var i = 10; i < 10000; i *= 10)
      setTimeout(function() {
        $('.ui.rating').rating();
      }, 10);

    $scope.increment = function(item){
      item.value += item.increment;
    }

    $scope.decrement = function(item){
      item.value -= item.increment;
    }

    $scope.read = function() {
      console.log(data);
      for(var i = 0; i < $scope.template.components.length; i++) {
        var curr = $scope.template.components[i];
        switch(curr.type) {
          case 0:
            console.log(curr.name + " " + $("#" + curr.$$hashKey.replace(":", "\\:")).val());
            break;
          case 1:
            console.log(curr.name + " " + curr.value);
            break;
          case 2:
            console.log(curr.name + " " + $("#" + curr.$$hashKey.replace(":", "\\:")).val());
            break;
          case 3:
            console.log(curr.name + " " + $("#" + curr.$$hashKey.replace(":", "\\:")).rating('get rating'))
        }
      }
    }

  });
}]);
