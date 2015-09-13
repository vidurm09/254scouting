app.controller('CreateController', ['$scope', 'components', '$sce', function($scope, components, $sce) {
  components.success(function(data) {
    $scope.components = data;
    $scope.templatecomp = [];

    $scope.addText = function() {
      if($scope.textlabel.length > 0) {
        $scope.templatecomp.push({
          "name" : $scope.textlabel,
          "type" : 0
        });
        $scope.textlabel = '';
      }
    };

    $scope.addCounter = function() {
      if(!isNaN($scope.counterincrementlabel) && $scope.counterincrementlabel > 0) {
        $scope.templatecomp.push({
          "name" : $scope.counterlabel,
          "type" : 1,
          "value" : 0,
          "increment" : Number($scope.counterincrementlabel)
        });
        $scope.counterlabel = '';
        $scope.counterincrementlabel = '';
      }
      else {
        $scope.counterlabel = '';
        $scope.counterincrementlabel = '';
      }
    };

    $scope.increment = function(item){
      item.value += item.increment;
    }

    $scope.decrement = function(item){
      item.value -= item.increment;
    }

    $scope.addCheckbox = function() {
      if($scope.checkboxlabel.length > 0) {
        $scope.templatecomp.push({
          "name" : $scope.checkboxlabel,
          "type" : 2
        });
        $scope.checkboxlabel = '';
      }
    };

    $scope.addRating = function() {
      if($scope.ratinglabel.length > 0 && !isNaN($scope.ratingmaxlabel)) {
        $scope.templatecomp.push({
          "name" : $scope.ratinglabel,
          "type" : 3,
          "max" : Number($scope.ratingmaxlabel)
        });
        $scope.ratinglabel = '';
        $scope.ratingmaxlabel = '';
        setTimeout(function(){$('.ui.rating').rating(); console.log("1")}, 20);
      }
    };
  });
}]);
