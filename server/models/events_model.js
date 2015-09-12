var eventSchema = new Schema({
  name: {type: String, required: true},
  scouting-team: {type: String, required: true},
  tempate: {type: ObjectId, required: true},
  startDate: Date,
  endDate: Date
});

var Event = mongoose.model('Event', eventSchema);
module.exports = Event;
