"use strict";

const fs = require('fs').promises;


const checkPath = (filePath) => {

};

module.exports = {
    readFile: async function (filePath) {
        const fileContents = await fs.readFile(filePath, 'utf-8');
        return fileContents;
    }
};