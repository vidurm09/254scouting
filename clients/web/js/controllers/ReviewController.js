app.controller('ReviewController', ['$scope', 'event', 'templates', '$routeParams', '$http', 'entries', function($scope, event, template, $routeParams, $http, entries) {
  template.success(function (tempdata) {
    tempdata = tempdata["data"];
    event.success(function(data) {
      for(var i = 10; i < 10000; i *= 10)
        setTimeout(function() {
          $('thead').popup();
          $('.sortable.table').tablesort();
        }, 10);

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

      var idid = 0;
      $scope.tabledata = {};
      $scope.totals = {};
      $scope.counts = {};
      $scope.tableheader = [];
      $scope.idname = "";
      for(var i = 0; i < $scope.template.components.length; i++) {
        if($scope.template.components[i].identifier) {
          idid = i;
          $scope.tableheader.unshift($scope.template.components[i].name);
          $scope.idname = $scope.template.components[i].name;
        }
        else if($scope.template.components[i].type > 0) {
          $scope.tableheader.push($scope.template.components[i].name);
        }
      }

      entries.event($routeParams.eventkey, function(entrydata) {
        if(entrydata.success == "true") {
          $scope.entries = entrydata.data;
          for(entry in $scope.entries) {
            var currentry = $scope.entries[entry].data;
            var currname = currentry[$scope.idname];
            $scope.counts[currname] = $scope.counts[currname] == undefined ? 1 : $scope.counts[currname] + 1;
            $scope.tabledata[currname] = {};
            $scope.totals[currname] = {};
          }
          var boolnames = []
          for(entry in $scope.entries) {
            var currentry = $scope.entries[entry].data;
            var currname = currentry[$scope.idname];
            for(var key in currentry) {
              if(key != $scope.idname) {
                if(typeof currentry[key] == "number") {
                  $scope.totals[currname][key] = $scope.totals[currname][key] == undefined ? currentry[key] : $scope.totals[currname][key] + currentry[key];
                }
                else if(typeof currentry[key] == "boolean") {
                  if(boolnames.indexOf(key) == -1) {
                    boolnames.push(key);
                  }
                  $scope.totals[currname][key] = $scope.totals[currname][key] == undefined ? (currentry[key] ? 1 : 0) : $scope.totals[currname][key] + (currentry[key] ? 1 : 0);
                }
              }
            }
            for(var key in currentry) {
              if(key != $scope.idname) {
                if(boolnames.indexOf(key) == -1) {
                  $scope.tabledata[currname][key] = $scope.totals[currname][key] / $scope.counts[currname];
                  $scope.tabledata[currname][key] = $scope.tabledata[currname][key] % 1 == 0 ? $scope.tabledata[currname][key] : $scope.tabledata[currname][key].toFixed(2);
                }
                else {
                  $scope.tabledata[currname][key] = ($scope.totals[currname][key] / $scope.counts[currname]) * 100.0;
                  $scope.tabledata[currname][key] = $scope.tabledata[currname][key] % 1 == 0 ? $scope.tabledata[currname][key] : $scope.tabledata[currname][key].toFixed(2);
                  $scope.tabledata[currname][key] += "%";
                }
              }
            }
          }
          $scope.boolnames = boolnames;
          console.log($scope);
        }
        else {
          console.error("Something bad happened on the server side.");
        }
      });

      $scope.moredetails = function(id) {
        console.log(id);
      }
    });
  });
}]);
