const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const PORT = 3001;
rl.question('Enter directory name: ', (input) => {
  const FILES_DIR = path.join(__dirname, input);

  // If the directory doesn't exist, create it
  if (!fs.existsSync(FILES_DIR)) {
    console.error('New directory created');
    fs.mkdirSync(FILES_DIR);
  }

  // Now start the server (after directory check and creation)
  const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const route = parsedUrl.pathname;
    const query = parsedUrl.query;

    const sendResponse = (statusCode, content, contentType = 'text/plain') => {
      res.writeHead(statusCode, { 'Content-Type': contentType });
      res.end(content);
    };

    switch (route) {
      case '/list':
        fs.readdir(FILES_DIR, (err, files) => {
          if (err) {
            sendResponse(500, 'Failed to list files');
          } else {
            sendResponse(200, files.join('\n'), 'text/plain');
          }
        });
        break;

      case '/file':
        if (!query.name) {
          sendResponse(400, 'Missing "name" query parameter');
          return;
        }
        const filePath = path.join(FILES_DIR, query.name);
        fs.readFile(filePath, 'utf-8', (err, data) => {
          if (err) {
            if (err.code === 'ENOENT') {
              sendResponse(404, 'File not found');
            } else {
              sendResponse(500, 'Failed to read file');
            }
          } else {
            sendResponse(200, data, 'text/plain');
          }
        });
        break;

      case '/create':
        if (!query.name || !query.content) {
          sendResponse(400, 'Missing "name" or "content" query parameter');
          return;
        }
        const createFilePath = path.join(FILES_DIR, query.name);
        fs.writeFile(createFilePath, query.content, (err) => {
          if (err) {
            sendResponse(500, 'Failed to create file');
          } else {
            sendResponse(201, 'File created');
          }
        });
        break;

      case '/append':
        if (!query.name || !query.content) {
          sendResponse(400, 'Missing "name" or "content" query parameter');
          return;
        }
        const appendFilePath = path.join(FILES_DIR, query.name);
        fs.appendFile(appendFilePath, query.content, (err) => {
          if (err) {
            if (err.code === 'ENOENT') {
              sendResponse(404, 'File not found');
            } else {
              sendResponse(500, 'Failed to append to file');
            }
          } else {
            sendResponse(200, 'Content appended');
          }
        });
        break;

      case '/delete':
        if (!query.name) {
          sendResponse(400, 'Missing "name" query parameter');
          return;
        }
        const deleteFilePath = path.join(FILES_DIR, query.name);
        fs.unlink(deleteFilePath, (err) => {
          if (err) {
            if (err.code === 'ENOENT') {
              sendResponse(404, 'File not found');
            } else {
              sendResponse(500, 'Failed to delete file');
            }
          } else {
            sendResponse(200, 'File deleted');
          }
        });
        break;

      default:
        sendResponse(404, 'Route not found');
        break;
    }
  });

  // Start the server only after checking and creating the directory (if necessary)
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    
  });

  // Close the readline interface after the server has started
  rl.close();
});
