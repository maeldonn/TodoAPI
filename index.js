const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Salut tout le monde !');
});
server.listen(8080);
