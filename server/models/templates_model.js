var templateSchema = new Schema({
  title: {type: String, required: true, unique: true},
  description: {type: String},
  author: {type: String, required: true},
  components: {type: Object, required: true},
  featured: {type: Boolean, required: false}
});

var Template = mongoose.model('Template', templateSchema);
module.exports = Template;
