app.factory('event', ['$http', '254_CONFIG', function($http, config) {
  return $http.get(config.serverURL + '/api/event')
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           return data;
         });
}]);
