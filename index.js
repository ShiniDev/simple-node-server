"use strict";

// Libraries
const http = require('http');
const url = require('url');

// Set Global Variables
process.env.ROOT_DIRECTORY = process.cwd() + "/";
process.env.PUBLIC_DIRECTORY = process.env.ROOT_DIRECTORY + "public/";

// Modules

// App Settings
const PORT = 3000;

const server = http.createServer((req, res) => {
    const HTTP_METHOD = req.method;
    if (HTTP_METHOD == "GET") {
        const URL = new url.URL(`http://${req.headers.host}${req.url}`);
    } else {
        res.writeHead(405, { "Content-type": "text/html" });
        res.end('Test');
    }
});

server.listen(3000);