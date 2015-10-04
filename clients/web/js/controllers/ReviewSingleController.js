app.controller('ReviewSingleController', ['$scope', 'event', 'templates', '$routeParams', '$http', 'entries', '254_CONFIG', 'websocket', function($scope, event, template, $routeParams, $http, entries, config, $websocket) {
  template.success(function (tempdata) {
    tempdata = tempdata["data"];
    event.success(function(data) {
      for(var i = 10; i < 10000; i *= 10) {
        setTimeout(function() {
          $('thead').popup();
          $('.sortable.table').tablesort();
        }, i);
      }
      $scope.removeEntry = function(id) {
        $scope.toDelete = id;
        $('.ui.modal').modal('show');
      };

      $scope.deleteEntry = function() {
        console.log($scope.toDelete);
        $http.get(config.serverURL + '/api/entry/delete?entryid='+$scope.toDelete)
        .success(function(data) {
          window.location.reload();
        })
        .error(function(data) {
          console.error("Did not succesfully delete entry.");
          window.location.reload();
        });
      };

      $scope.return = function() {
        window.location.href = window.location.href.split("#")[0]+"#/event/scout/" + $routeParams.eventkey;
      }

      data = data.data;
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
      $scope.tableheader = []
      for(var i = 0; i < $scope.template.components.length; i++) {
        if($scope.template.components[i].identifier) {
          idid = i;
          $scope.idname = $scope.template.components[i].name;
        }
        else {
          $scope.tableheader.push($scope.template.components[i].name);
        }
      }
      $scope.route = $routeParams;
      entries.singleteam($routeParams.eventkey, $scope.idname, $routeParams.target, function(entrydata) {
        $scope.entries = entrydata.data;
        console.log($scope);
        if($scope.entries.length == 0) {
          $scope.return();
        }
      });
    });
  });
}]);
