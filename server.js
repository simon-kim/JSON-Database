var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var data = ('/Data/');

app.post('/:drink', function(req, res) {
  var ws = fs.createWriteStream(__dirname + data + req.params.drink + '.json');
  ws.write(JSON.stringify(req.body));
  ws.end();
  res.json(req.body);
});

app.get('/:drink', function(req, res) {
  var name = (__dirname + data + req.params.drink + '.json');
  var stream = fs.createReadStream(name);

  stream.on('readable', function() {
    res.writeHead(200, {'Content-Type': 'application/json'});
    stream.pipe(res);
  });
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('server running on port: %d', app.get('port'));
});
