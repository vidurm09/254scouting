app.factory('templates', ['$http', function($http) {
  return $http.get('http://0.0.0.0:8080/js/faketemplates.json')
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           return data;
         });
}]);
