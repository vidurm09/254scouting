var Event = require('./models/events_model');
var Template = require('./models/templates_model');
var shortid = require('shortid');

exports.createEvent = function(req, res) {
  var key = shortid.generate();
  var newEvent = new Event({
    name: req.body.name,
    scoutingteam: req.body.scoutingteam,
    template: req.body.template,
    startDate: new Date(),
    robotevents: req.body.robotevents == undefined ? "Unavailable" : req.body.robotevents,
    eventkey: key
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
        success: 'true',
        data: {
          eventkey: key
        }
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

exports.findEvent = function(req, res) {
  Event.find({'eventkey' : req.query.key}, function(err, events) {
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
