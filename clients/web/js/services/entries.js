app.factory('entries', ['$http', function($http) {
  return {
    event: function(id, callback) {
      $http.get('http://localhost:8080/api/entry?key='+id)
      .success(function(data) {
        callback(data);
      })
      .error(function(data) {
        callback(data);
      });
    }
  }
}]);
