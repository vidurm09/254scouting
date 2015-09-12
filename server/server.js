global.mongoose = require('mongoose');
global.Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/254scouting');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var template = require('./templates');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var router = express.Router();

router.get('/', function(req, res) {res.json({ success: 'true', message: 'Successfully connected!' });});

router.route('/template').post(template.createTemplate);
router.route('/template').get(template.findTemplates);

app.use('/api', router);
app.listen(port);
console.log('Doing magic on port ' + port);
