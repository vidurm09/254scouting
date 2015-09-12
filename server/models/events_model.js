var eventSchema = new Schema({
  name: {type: String, required: true},
  scoutingteam: {type: String, required: true},
  template: {type: String, required: true},
  startDate: Date,
  robotevents: String,
  teams: [String]
});

var Event = mongoose.model('Event', eventSchema);
module.exports = Event;
