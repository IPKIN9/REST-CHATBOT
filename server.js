const http = require('http');
const app = require('./app');

const port = process.env.SERVER_PORT || 3000;

http.createServer(app).listen(port);

console.log("Youre server run in: http://localhost:" + port);