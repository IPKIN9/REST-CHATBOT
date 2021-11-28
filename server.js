const http = require('http');
const express = require('express');

const port = process.env.SERVER_PORT || 3000;

http.createServer(function(req, res){
    res.writeHead(200, {'Type-Object':'Text/Json'});
    res.end("Testing");
}).listen(port);

console.log("Youre server run in: http://localhost:" + port);