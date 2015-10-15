app.factory('components', ['$http', '254_CONFIG', function($http, config) {
  return $http.get(config.serverURL + '/api/components')
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           return data;
         });
}]);
