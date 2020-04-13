var serveFile = require('./serveFile')

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
      console.log(request.url)

      response.writeHead(302, { 'Location': '.' });
      response.end();

      break;

    default:
      response.writeHead(400);
      response.end("Bad Request.");
  }
}