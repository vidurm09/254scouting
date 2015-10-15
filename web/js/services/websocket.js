app.factory('websocket', ['$$q', '254_CONFIG', '$rootScope', function($q, config, $rootScope) {
  // We return this object to anything injecting our service
   var Service = {};
   // Keep all pending requests here until they get responses
   var callbacks = {};
   // Create a unique callback ID to map requests to responses
   var currentCallbackId = 0;
   // Create our websocket object with the address to the websocket
   var ws = new WebSocket(config.websocketURL);

   ws.onopen = function(){
       console.log("Socket has been opened!");
   };

   ws.onmessage = function(message) {
       Service.listener(message.data);
   };

   Service.sendUpdate = function(request) {
     console.log('Sending request', request);
     ws.send("{update:true}");
   }

   Service.listener = function(data) {
     var messageObj = data;
     console.log(data);
     // If an object exists with callback_id in our callbacks object, resolve it
     window.location.reload();
   }
   // This creates a new callback ID for a request
   function getCallbackId() {
     currentCallbackId += 1;
     if(currentCallbackId > 10000) {
       currentCallbackId = 0;
     }
     return currentCallbackId;
   }

   // Define a "getter" for getting customer data
   Service.getCustomers = function() {
     var request = {
       type: "get_customers"
     }
     // Storing in a variable for clarity on what sendRequest returns
     var promise = Service.sendRequest(request);
     return promise;
   }

   return Service;
}]);
