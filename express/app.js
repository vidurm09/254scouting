var express = require('express'),
    app = express();

app.get('/', function (req, res) {
  res.send('Hello World!' + req);
});

app.listen(process.env.PORT);
console.log('Express server started on port %s', process.env.PORT);