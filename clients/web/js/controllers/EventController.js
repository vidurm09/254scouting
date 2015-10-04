app.controller('EventController', ['$scope', 'templates', 'event', '$http', '254_CONFIG', function($scope, templates, event, $http, config) {
  event.success(function(data) {
    $scope.events = data["data"]

    $scope.findEventByKey = function(key) {
      for(var i = 0; i < $scope.events.length; i++) {
        if($scope.events[i]["eventkey"] == key) {
          return $scope.events[i];
        }
      }
      $("#nofinderror").fadeIn();
      return null;
    };

    $scope.scoutEvent = function() {
      $scope.new = {}
      $scope.new.event = $scope.findEventByKey($("#eventcode").val());
      $scope.new.scout = $("#scoutname").val();
      if($scope.new.event != null) {
        $scope.new.scout = $scope.new.scout.replace(" ", "-")
        window.location.href = window.location.href.split("#")[0]+"#/event/scout/" + $scope.new.event.eventkey + "/" + $scope.new.scout;
      };
    };

    $scope.reviewEvent = function() {
      $scope.new = {}
      $scope.new.event = $scope.findEventByKey($("#eventcode").val());
      if($scope.new.event != null) {
        window.location.href = window.location.href.split("#")[0]+"#/event/scout/" + $scope.new.event.eventkey;
      };
    };
  })
  templates.success(function(data) {
    $scope.templates = data["data"];
    $('select.dropdown').dropdown();

    $scope.setTemplates = function() {
      $scope.templatecodes = [];
      for(var i = 0; i < $scope.templates.length; i++) {
        $scope.templatecodes.push($scope.templates[i]._id);
      }
    };

    $scope.createEvent = function() {
      $scope.setTemplates();
      $scope.newEvent = {};
      $scope.newEvent.name = $("#eventname").val();
      $scope.newEvent.scoutingteam = $("#scoutingteam").val();
      $scope.newEvent.template = $scope.templatecodes[$("#idpicker").val()];
      if($scope.newEvent.name.length > 0 && $scope.newEvent.scoutingteam.length > 0 && $scope.newEvent.template.length > 0) {
        $http.post(config.serverURL + "/api/event", $scope.newEvent).success(function(data, status) {
          if(data['success'] == "true") {
            window.location.href = window.location.href.split("#")[0]+"#/event/scout/" + data.data.eventkey;
          }
          else {
            $("#ohno").fadeIn();
            console.error(status);
            console.warn(data);
          }
        });
      }
      else {
        $("#ohno").fadeIn();
        console.error("Make sure all the fields are filled out!");
      }
    };
  });
}]);
