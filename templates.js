var Template = require('./models/templates_model');

exports.createTemplate = function(req, res) {
  console.log(req.body);
  var newTemplate = new Template({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    components: JSON.parse(req.body.components)
  });
  newTemplate.save(function (err) {
    if(err) {
      console.warn(err);
      res.json({
        success: 'false',
        message: 'Something went wrong...'
      });
    }
    else {
      res.json({
        success: 'true'
      });
    }
  });
};

exports.findTemplates = function(req, res) {
  Template.find({}, function(err, templates) {
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
        data: templates
      });
    }
  });
};
