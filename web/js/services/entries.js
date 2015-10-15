app.factory('entries', ['$http', '254_CONFIG', function($http, config) {
  return {
    event: function(id, callback) {
      $http.get(config.serverURL + '/api/entry?key='+id)
      .success(function(data) {
        callback(data);
      })
      .error(function(data) {
        callback(data);
      });
    },
    singleteam: function(id, idname, target, callback) {
      $http.get(config.serverURL + '/api/entry/specific?key='+encodeURIComponent(id)+"&idname="+encodeURIComponent(idname)+"&target="+encodeURIComponent(target))
      .success(function(data) {
        callback(data);
      })
      .error(function(data) {
        callback(data);
      });
    }
  }
}]);
