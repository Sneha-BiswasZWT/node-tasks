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

      case '/':
        sendResponse(200, 'Welcome!!! \n\nMenu:\n\nadd the following to the url:\n   "/list" = to list all files in the directory\n    "/file?name=filename.txt"= to display the content in the specified file\n    "/create?name=filename.txt&content=NewContent" = to create a new file with content\n   "/append?name=filename.txt&content=NewContent" = to appened content to an existing file\n   "/delete?name=filename.txt" = to delete a file ', 'text/plain');
        break;

      case '/list':
        fs.readdir(FILES_DIR, (err, files) => {
          if (err) {
            sendResponse(500, 'Failed to list files');
          }
          else if (files.length === 0) {
            sendResponse(200, 'No files found in the directory', 'text/plain');
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

        //chechks extension of file
        const extname = path.extname(query.name);
        if (extname == '.txt') {
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
        }
        else {
          sendResponse(400, 'wrong extension, use .txt');
          return;
        }

        break;

      case '/create':
        if (!query.name || !query.content) {
          sendResponse(400, 'Missing "name" or "content" query parameter');
          return;
        }
        const ext = path.extname(query.name);
        if (ext == '.txt') {
          console.log('hi',query.name, fs.existsSync(query.name));
          const createFilePath = path.join(FILES_DIR, query.name);
          if (fs.existsSync(query.name)) {
          console.log('bye');
            
            sendResponse(400, 'file already exists');

          }

          else {
          console.log('1');                                                                                                                                                                                                                                                                           

            fs.writeFile(createFilePath, query.content, (err) => {
              if (err) {
                sendResponse(500, 'Failed to create file');
              } else {
                sendResponse(201, 'File created');
              }
            });
            
          }

          return;
        }
        else {
          console.log('2');

          sendResponse(400, 'wrong extension, use .txt');
          break;
        }

        break;

      case '/append':

        if (!query.name || !query.content) {
          sendResponse(400, 'Missing "name" or "content" query parameter');
          return;
        }
        const ext1 = path.extname(query.name);
        if (ext1 == '.txt') {
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
        }
        else {
          sendResponse(400, 'wrong extension, use .txt');
          return;
        }

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
