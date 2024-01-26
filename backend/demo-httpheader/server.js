const http = require('http');
const httplog = require('access-log');

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
    httplog(req, res);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<!DOCTYPE html>\n');
    res.write('<html>\n');
    res.write('<head>\n');
    res.write('    <title>' + req.url + '</title>\n');
    res.write('</head>\n');
    res.write('<body>\n');
    res.write('<p>IP: ' + req.socket.remoteAddress + '</p>\n');
    res.write('<p>Port: ' + req.socket.remotePort + '</p>\n');
    res.write('<p>Host: ' + req.headers.host + '</p>\n');
    res.write('<p>Method: ' + req.method + '</p>\n');
    res.write('<p>Url: ' + req.url + '</p>\n');
    res.write('<p>Cookie: ' + (req.headers.cookie || 'None') + '</p>\n');
    res.write('<p></p>\n<p>HTTP Header:</p>\n');
    res.write('<p>' + JSON.stringify(req.headers, null, 2) + '</p>');
    res.write('<p>Post body: ' + body + '</p>\n'); 
    if (req.url === '/post') {
        res.write('   <h2>Post</h2>\n');
        res.write('    <form action="/post" method="post" enctype="multipart/form-data">\n');
        res.write('        <input type="text" name="name" placeholder="Name" required>\n');
        res.write('        <input type="email" name="email" placeholder="Email" required>');
        res.write('        <input type="text" name="phone" placeholder="Phone" required>\n');
        res.write('        <input type="file" name="photo" required>\n');
        res.write('        <button type="submit">Post</button>');
        res.write('    </form>\n');
    }
    res.write('</body>\n');
    res.write('</html>\n');
    res.end();
}

const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});

