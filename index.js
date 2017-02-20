var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

types = {
  "css": "text/css",
  "gif": "image/gif",
  "html": "text/html",
  "ico": "image/x-icon",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "js": "text/javascript",
  "json": "application/json",
  "pdf": "application/pdf",
  "png": "image/png",
  "svg": "image/svg+xml",
  "swf": "application/x-shockwave-flash",
  "tiff": "image/tiff",
  "txt": "text/plain",
  "wav": "audio/x-wav",
  "wma": "audio/x-ms-wma",
  "wmv": "video/x-ms-wmv",
  "xml": "text/xml"
};

var server = http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname;

  if(pathname.endsWith('/'))
    pathname += 'index.html';

  var realPath = path.join(__dirname, decodeURI(pathname));
  fs.exists(realPath, function (exists) {
    if(!exists) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('File not found:', realPath);
    } else {
      fs.readFile(realPath, 'binary', function (err, file) {
        if (err) {
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.end(err);
        } else {
          var ext = path.extname(realPath);
          ext = ext ? ext.slice(1) : 'unknown';
          var contentType = types[ext] || 'text/plain';

          res.writeHead(200, {'Content-Type': contentType});
          res.write(file, 'binary');
          res.end();
        }
      });
    }
  });
});

server.listen(8000, function (err, res) {
  console.log('Server is running at port: 8000.');
});
