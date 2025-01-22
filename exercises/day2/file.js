const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter directory path: ', (input) => {
  const directoryPath = input; 

  function listFiles(directoryPath) {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return console.error(`Unable to read directory: ${err.message}`);
      }

      console.log(`Files in directory '${directoryPath}':`);
      files.forEach(file => {
        console.log(file); 
      });
    });
  }

  listFiles(directoryPath);
  rl.close();
});

