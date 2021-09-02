"use strict";

const fs = require('fs').promises;
const { lstatSync, existsSync } = require('fs');
const { join, extname } = require('path');

const checkPath = (filePath) => {
    filePath = join(process.env.PUBLIC_DIRECTORY, filePath);
    if (!existsSync(filePath)) {
        return "error404";
    }
    let isDirectory = lstatSync(filePath).isDirectory();
    if (isDirectory) {
        if (filePath.charAt(filePath.length - 1) !== "/") {
            filePath = `${filePath}/`;
        }
        filePath = `${filePath}index.html`;
    }
    if (existsSync(filePath)) {
        return filePath;
    } else {
        return "error404";
    }
    // return filePath;
};

const readFilePromise = async (filePath) => {
    return await fs.readFile(filePath, 'utf-8');
};

module.exports = {
    updatePath: filePath => checkPath(filePath),
    readFile: (filePath) => {
        filePath = checkPath(filePath);
        if (filePath === "error404") {
            return Promise.resolve("error404");
        }
        const fileContents = readFilePromise(filePath);
        return fileContents;
    },
    fileContentType: (filePath) => {
        let fileType = extname(filePath);
        switch (fileType) {
            case ".html":
                return "text/html";
            case ".css":
                return "text/css";
            case ".js":
                return "text/javascript";
            default:
                return "text/plain";
        }
    }
};