app.factory('components', ['$http', function($http) {
  return $http.get('http://localhost:8080/api/components')
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           return data;
         });
}]);
