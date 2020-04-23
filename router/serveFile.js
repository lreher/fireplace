var fs = require('fs');
var path = require('path');

module.exports = function(response, servePath) {
  var resolvedPath = path.resolve(__dirname, servePath);

  var splitPath = servePath.split('.');
  var extension = splitPath[splitPath.length-1];

  var extensionToContentType = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/json',
    'ico': 'image/x-icon'
  }

  response.writeHead(200, { 'Content-Type': extensionToContentType[extension] });
  fs.createReadStream(resolvedPath, 'utf-8').pipe(response);
}