app.controller('ScoutController', ['$scope', 'event', 'templates', '$routeParams', '$http', '254_CONFIG', function($scope, event, template, $routeParams, $http, config) {
  template.success(function (tempdata) {
    tempdata = tempdata["data"];
    event.success(function(data) {
      data = data["data"];

      $scope.scout = $routeParams.scoutname.replace("-", " ");

      for(var i = 0; i < data.length; i++) {
        if(data[i].eventkey == $routeParams.eventkey) {
          data = data[i];
          $scope.event = data;
          break;
        }
      }

      for(var i = 0; i < tempdata.length; i++) {
        if(tempdata[i]["_id"] == data.template) {
          $scope.template = tempdata[i];
          break;
        }
      }

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

      $scope.reset = function() {
        console.log("reset");
        for(var i = 0; i < $scope.template.components.length; i++) {
          var curr = $scope.template.components[i];
          switch(curr.type) {
            case 0:
              $("#" + curr.$$hashKey.replace(":", "\\:")).val("");
              break;
            case 1:
              curr.value = 0;
              break;
            case 2:
              $("#" + curr.$$hashKey.replace(":", "\\:")).checkbox('set unchecked');
              break;
            case 3:
              $("#" + curr.$$hashKey.replace(":", "\\:")).rating('clear rating');
              break;
          }
        }
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
        $scope.read(function(match) {
          $scope.newentry = {
            scoutname: $scope.scout,
            eventkey: $scope.event.eventkey,
            templateid: $scope.template._id,
            entry: match
          }
          $http.post(config.serverURL + "/api/entry", $scope.newentry).success(function(data, status) {
            if(data['success'] == "true") {
              $scope.reset()
              window.location.href = window.location.href.split("#")[0]+"#/event/scout/" + $scope.event.eventkey + "/" + $scope.scout;
            }
            else {
              console.error(status);
              console.warn(data);
            }
          })
          .error(function() {
            $("#ohno").fadeIn();
          });
        });
      };
    });
  });
}]);
