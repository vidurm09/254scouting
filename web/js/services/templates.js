app.factory('templates', ['$http', '254_CONFIG', function($http, config) {
  return $http.get(config.serverURL + '/api/template')
         .success(function(data) {
           return data["data"];
         })
         .error(function(data) {
           return data["data"];
         });
}]);
