global.mongoose = require('mongoose');
global.Schema = mongoose.Schema;
var config = require('./config')
console.log(config.mongodb.url + config.mongodb.database);
mongoose.connect(config.mongodb.url + config.mongodb.database);

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var websocket = require("./websocket");
var template = require('./templates');
var events = require('./events');
var entries = require('./entry');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

var port = process.env.PORT || 8080;
var router = express.Router();

router.get('/', function(req, res) {res.json({ success: 'true', message: 'Successfully connected!' });});

router.route('/template').post(template.createTemplate);
router.route('/template').get(template.findTemplates);

router.route('/event').post(events.createEvent);
router.route('/event').get(events.findEvents);

router.route('/entry').post(entries.createEntry);
router.route('/entry').get(entries.findEntries);
router.route('/entry/specific').get(entries.findEntriesWithParam);
router.route('/entry/delete').get(entries.removeEntry);


router.route('/components').get(function (req, res) { res.sendFile(path.join(__dirname, 'components.json')); });

app.use('/api', router);
app.listen(config.host.port,config.host.ip);

console.log('Doing magic on port ' + config.host.port + " & " + config.websocket.port);
