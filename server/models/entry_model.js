var entrySchema = new Schema({
  name: {type: String, required: true, unique: true},
  scoutedby: String,
  eventid: Schema.types.ObjectId,
  entries: [Object],
  comments: [Object]
});

var Entry = mongoose.model('Entry', entrySchema);
module.exports = Entry;
