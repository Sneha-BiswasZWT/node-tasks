const fs = require('fs');
const path = require('path');

function listFiles(directoryPath) {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return console.error(`Unable to read directory: ${err.message}`);
        }

        console.log(`Files in directory '${directoryPath}':`);
    })}

    const directoryPath = './'; 

listFiles(directoryPath);