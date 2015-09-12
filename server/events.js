var Event = require('./models/events_model');
var Template = require('./models/templates_model');

exports.createEvent = function(req, res) {
  var newEvent = new Event({
    name: req.body.name,
    scoutingteam: req.body.scout,
    template: req.body.template,
    startDate: req.body.date == undefined ? new Date() : req.body.date,
    robotevents: req.body.robotevents == undefined ? "Unavailable" : req.body.robotevents
  });
  newEvent.save(function (err) {
    if(err) {
      console.warn(err);
      res.json({
        success: 'false',
        message: 'Something went wrong...'
      });
    }
    else {
      res.json({
        succes: 'true'
      });
    }
  });
};

exports.findEvents = function(req, res) {
  Event.find({}, function(err, events) {
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
        data: events
      });
    }
  });
};
