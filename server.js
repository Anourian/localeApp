var express = require('express');

var app = express();
var handler = require('./requesthandler')
app.use(express.static(__dirname +"/src/client"));
var port = process.env.PORT || 8080;
app.listen(port);
console.log("On port: " + port);
app.get('/data',handler.data)