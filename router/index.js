var serveFile = require('./serveFile')

module.exports = function(request, response) {
  var url = request.url;
    
  switch(url) {
    // Serve files.
    case '/':
      serveFile(response, '../client/static/index.html');
      break;

    default: 
      response.writeHead(400);
      response.end("Bad Request.");
  }
}