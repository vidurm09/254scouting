app.controller('CreateController', ['$scope', 'components', '$sce', "254_CONFIG", function($scope, components, $sce, config) {
  components.success(function(data) {
    $scope.components = data;
    $scope.templatecomp = [];
    $scope.textcounter = 0;

    $('select.dropdown').dropdown();

    $scope.addText = function() {
      console.log($scope.templatecomp);
      if($scope.textlabel.length > 0) {
        $scope.templatecomp.push({
          "name" : $scope.textlabel,
          "type" : 0,
          "identifier" : false,
          "textid" : $scope.textcounter
        });
        $scope.textlabel = '';
        $scope.textcounter++;
        $('select.dropdown').dropdown();
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

    $scope.pickIdentifier = function() {
      for(var i = 0; i < $scope.templatecomp.length; i++) {
        if($scope.templatecomp[i].textid == $("#idpicker").val()) {
          $scope.templatecomp[i].identifier = true;
        }
      }
    };

    $scope.commitTemplate = function() {
      $scope.pickIdentifier();
      for(var i = 0; i < $scope.templatecomp.length; i++)
        delete $scope.templatecomp[i]["$$hashKey"]
      $scope.settings = {
        "async": true,
        "crossDomain": true,
        "url": config.serverURL + "/api/template",
        "method": "POST",
        "headers": {},
        "data": {
          "title": $scope.templatetitle,
          "author": $scope.templateauthor,
          "description": $scope.templatedesc,
          "components": JSON.stringify($scope.templatecomp)
        }
      }
      $.ajax($scope.settings).done(function (response) {
        if(response.success=="true") {
          $('.ui.basic.modal.yes').modal('show');
        }
        else {
          $('.ui.basic.modal.no').modal('show');
        }
      });
    };
  });
}]);
