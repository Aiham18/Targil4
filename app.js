const http = require('http');
const fs = require('fs');
const path = require('path');

const routes = {
    '/': ['page.html', 'text/html; charset=utf-8'],
    '/page.html': ['page.html', 'text/html; charset=utf-8'],
    '/about.html': ['about.html', 'text/html; charset=utf-8'],
    '/contact.html': ['contact.html', 'text/html; charset=utf-8'],
    '/css/style.css': ['css/style.css', 'text/css; charset=utf-8'],
    '/images/book.jpg': ['images/book.jpg', 'image/jpeg']
};

const server = http.createServer(function (req, res) {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    const route = routes[pathname];

    if (!route) {
        res.writeHead(404, {
            'Content-Type': 'text/html; charset=utf-8'
        });
        res.end('<h1>Page not found</h1>');
        return;
    }

    const filePath = path.join(__dirname, 'templates', route[0]);

    fs.readFile(filePath, function (err, data) {
        if (err) {
            res.writeHead(err.code === 'ENOENT' ? 404 : 500, {
                'Content-Type': 'text/html; charset=utf-8'
            });
            res.end('<h1>Unable to load file</h1>');
            return;
        }

        res.writeHead(200, { 'Content-Type': route[1] });
        res.end(data);
    });
});

server.listen(3000, function () {
    console.log('Server running at http://localhost:3000');
});