app.factory('event', ['$http', function($http) {
  return $http.get('http://localhost:8080/api/event')
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           return data;
         });
}]);
