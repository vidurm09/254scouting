var Entry = require('./models/entry_model');
var shortid = require('shortid');

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
