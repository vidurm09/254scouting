var Entry = require('./models/entry_model');
var shortid = require('shortid');
var websocket = require("./websocket");

exports.createEntry = function(req, res) {
  var key = shortid.generate();
  var newEntry = new Entry({
    entryid: key,
    scoutedby: req.body.scoutname,
    eventkey: req.body.eventkey,
    templateid: req.body.templateid,
    data: req.body.entry
  });
  newEntry.save(function (err) {
    if(err) {
      console.warn(err);
      res.json({
        success: 'false',
        message: 'Something went wrong...'
      });
    }
    else {
      websocket.server.connections.forEach(function (connection) {
    		connection.sendText("{update:true}");
    	});
      res.json({
        success: 'true',
      });
    }
  });
};

exports.findEntries = function(req, res) {
  Entry.find({"eventkey" : req.query.key }, function(err, entries) {
    if(err) {
      console.warn(err);
      res.json({
        success: 'false',
        message: 'Something went wrong...'
      });
    }
    else {
      res.json({
        success: 'true',
        data: entries
      });
    }
  });
}

exports.findEntriesWithParam = function(req, res) {
  Entry.find({"eventkey" : req.query.key}, function(err, entries) {
    if(err) {
      console.warn(err);
      res.json({
        success: 'false',
        message: 'Something went wrong...'
      });
    }
    else {
      var newentries = [];
      for(var i = 0; i < entries.length; i++) {
        if(entries[i]["data"][req.query.idname] != undefined && entries[i]["data"][req.query.idname] == req.query.target) {
          newentries.push(entries[i]);
        }
      }
      res.json({
        success: 'true',
        data: newentries
      });
    }
  });
};

exports.removeEntry = function(req, res) {
  Entry.find({ "entryid":req.query.entryid }).remove(function(err) {
    if(err) {
      console.warn(err);
      res.json({
        success: 'false',
        message: 'Something went wrong...'
      });
    }
    else {
      websocket.server.connections.forEach(function (connection) {
        connection.sendText("{update:true}");
    	});
      res.json({
        success: 'true',
      });
    }
  });
};
