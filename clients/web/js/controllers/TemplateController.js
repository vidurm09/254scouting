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

    $scope.read = function(callback) {
      var match = {}
      for(var i = 0; i < $scope.template.components.length; i++) {
        var curr = $scope.template.components[i];
        switch(curr.type) {
          case 0:
            match[curr.name] = $("#" + curr.$$hashKey.replace(":", "\\:")).val();
            break;
          case 1:
            match[curr.name] = curr.value;
            break;
          case 2:
            match[curr.name] = $("#" + curr.$$hashKey.replace(":", "\\:")).prop('checked');
            break;
          case 3:
            match[curr.name] = $("#" + curr.$$hashKey.replace(":", "\\:")).rating('get rating');
            break;
        }
      }
      callback(match);
    }

    $scope.save = function() {
      $scope.read(function(data) {
        console.log(data);
      });
    };
  });
}]);
