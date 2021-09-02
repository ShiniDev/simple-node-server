"use strict";

// Libraries
const http = require('http');
const url = require('url');

// Set Global Variables
process.env.ROOT_DIRECTORY = process.cwd();
process.env.PUBLIC_DIRECTORY = process.env.ROOT_DIRECTORY + "/public";

// Modules
const fileFunctions = require('./server/file-functions');

// App Settings
const PORT = 3000;

const server = http.createServer((req, res) => {
    const HTTP_METHOD = req.method;
    if (HTTP_METHOD === "GET") {
        const URL = new url.URL(`http://${req.headers.host}${req.url}`);
        const result = fileFunctions.readFile(URL.pathname);
        const filePath = fileFunctions.updatePath(URL.pathname);
        result.then(result => {
            if (result === "error404" || result === undefined) {
                res.writeHead(404, { "Content-type": "text/html" });
                fileFunctions.readFile("/errors/error-404.html").then(result => {
                    res.end(result);
                })
            } else {
                res.writeHead(200, { "Content-type": fileFunctions.fileContentType(filePath) })
                res.end(result);
            }
        });
    } else {
        res.writeHead(405, { "Content-type": "text/html" });
        fileFunctions.readFile("/errors/error-405.html").then(result => {
            res.end(result);
        });
    }
});

server.listen(3000);