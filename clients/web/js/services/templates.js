app.factory('templates', ['$http', function($http) {
  return $http.get('http://localhost:8080/api/template')
         .success(function(data) {
           return data["data"];
         })
         .error(function(data) {
           return data["data"];
         });
}]);
