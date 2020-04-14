var serveFile = require('./serveFile');

var auth = require('../auth');

module.exports = function(request, response) {
  var url = request.url;
    
  switch(url) {
    // Serve files.
    case '/':
      serveFile(response, '../client/static/index.html');
      break;

    case '/stylesheet.css':
      serveFile(response, '../client/static/stylesheet.css');
      break;
    
    case '/bundle.js':
      serveFile(response, '../client/static/bundle.js');
      break;

    // Spotify Redirect
    case (url.match(/callback/) || {}).input:
      url_parts = url.replace("/callback?code=", "").split("&state=")
      
      code = url_parts[0];
      userID = url_parts[1];

      auth.authorize(code, userID, function(error, authorization) {
        if (error) {
          response.writeHead(500);
          response.end("Failed to Authenticate to Spotify");
          return;
        }

        response.writeHead(302, { 'Location': '.' })
        response.end();
      })

      break;


    default:
      response.writeHead(400);
      response.end("Bad Request.");
  }
}