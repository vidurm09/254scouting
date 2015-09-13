var templateSchema = new Schema({
  title: {type: String, required: true, unique: true},
  description: {type: String},
  author: {type: String, required: true},
  components: [{}],
  featured: {type: Boolean, required: false}
});

var Template = mongoose.model('Template', templateSchema);
module.exports = Template;
