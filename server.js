var express = require('express');
var connect = require('connect');
var http = require('http');

var path = "";

var app = connect().use(express.static(__dirname + path));
http.createServer(app).listen(8080);
console.log('Server will be running on http://localhost:8080');