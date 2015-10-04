var entrySchema = new Schema({
  entryid: String,
  scoutedby: String,
  eventkey: String,
  templateid: String,
  data: {}
});

var Entry = mongoose.model('Entry', entrySchema);
module.exports = Entry;
