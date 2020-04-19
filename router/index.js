var serveFile = require('./serveFile');

var auth = require('../auth');
var profileController = require('../controller/profileController')

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
    
    case ('./profile_photo'):
      var url = '';

      request.on('data', function(chunk) {
        uri += chunk.toString()
      })
      .on('end', function() {
      
      })
      
      break;
    
    // User Endpoints
    case (url.match(/\?userID=/) || {}).input:
      url_parts = url.split('?userID=');

      var userID = url_parts[1];

      if (auth.getUserToken(userID) === null) {
        response.writeHead(401);
        response.end('Authentication Error');
        break;
      }

      switch (url_parts[0]) {
        case '/me':
          profileController.getProfile(userID, function(error, profile) {
            if (error) {
              response.writeHead(500);
              response.end("Failed to get User Information from Spotify.");
              return;
            }

            response.writeHead(200);
            response.end(JSON.stringify(profile));
          })

          break;
        
        case '/saved_songs':
          profileController.getSavedSongs(userID, function(error, songs) {
            if (error) {
              response.writeHead(500);
              response.end("Failed to get Saved Songs from Spotify.");
              return;
            }
            
            response.writeHead(200);
            response.end(JSON.stringify(songs));
          })

          break;

        case '/playlists':
          profileController.getPlaylists(userID, function(error, playlists) {
            if (error) {
              response.writeHead(500);
              response.end("Failed to get Playlists from Spotify.");
              return;
            }
            
            response.writeHead(200);
            response.end(JSON.stringify(playlists));
          });

          break;

        case '/playlist':
          var uri = '';
          
          request.on('data', function(chunk) {
            uri += chunk.toString()
          })
          .on('end', function() {
            profileController.getPlaylist(userID, uri, function(error, songs) {
              if (error) {
                response.writeHead(500);
                response.end("Failed to get Songs from Playlist from Spotify.");
                return;
              }
             
              response.writeHead(200);
              response.end(JSON.stringify(songs));
            })
          })

          break;

        default:
          response.writeHead(400);
          response.end("Bad User Request.");
      }

      break;
    
    default:
      response.writeHead(400);
      response.end("Bad Request.");
  }
}