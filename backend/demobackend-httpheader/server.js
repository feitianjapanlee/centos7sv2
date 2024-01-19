const http = require('http');

const server = http.createServer((req, res) => {
    let body = '';
    if (req.method === 'POST') {
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            responseAll(req, res, body);
        });
    } else {
        responseAll(req, res, body);
    }
});

function responseAll(req, res, body) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('IP: ' + req.socket.remoteAddress + '\n');
    res.write('Port: ' + req.socket.remotePort + '\n');
    res.write('Host: ' + req.headers.host + '\n');
    res.write('Method: ' + req.method + '\n');
    res.write('Url: ' + req.url + '\n');
    res.write('Post body: ' + body + '\n'); 
    res.write('Cookie: ' + (req.headers.cookie || 'None') + '\n');
    res.write('\nHTTP Header:\n');
    res.write(JSON.stringify(req.headers, null, 2));
    res.end();
}

const port = 3000;
server.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});

