var serveFile = require('./serveFile');

var auth = require('../auth');
var profileController = require('../controller/profileController')
var queueController = require('../controller/queueController')

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

    case '/favicon.ico':
      serveFile(response, '../client/static/favicon.ico');
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
    
    // User Endpoints
    case (url.match(/\?userID=/) || {}).input:
      url_parts = url.split('?userID=');

      var userID = url_parts[1];

      if (auth.getUserToken(userID) === null) {
        response.writeHead(401);
        response.end('Authentication Error');
        break;
      }

      var requestData = '';
      var data;
          
      request.on('data', function(chunk) {
        requestData += chunk.toString()
      })
      .on('end', function() {
        if (requestData) {
          data = JSON.parse(requestData);
        }

        // todo move to its own router
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

          case '/saved_songs':
            profileController.getSavedSongs(userID, data.offset, function(error, songs) {
              if (error) {
                response.writeHead(500);
                response.end("Failed to get Saved Songs from Spotify.");
                return;
              }
              
              response.writeHead(200);
              response.end(JSON.stringify(songs));
            })
  
            break;
          
          case '/favorite_songs':
            profileController.getFavoriteSongs(userID, function(error, songs) {
              if (error) {
                response.writeHead(500);
                response.end("Failed to get Favorite Songs from Spotify.");
                return;
              }
              
              response.writeHead(200);
              response.end(JSON.stringify(songs));
            })
  
            break;

          case '/playlist':
            profileController.getPlaylist(userID, data.uri, data.offset, function(error, songs) {
              if (error) {
                response.writeHead(500);
                response.end("Failed to get Songs from Playlist from Spotify.");
                return;
              }
              
              response.writeHead(200);
              response.end(JSON.stringify(songs));
            })  

            break;
          
          case '/add_to_queue':
            queueController.addToQueue(data.song);

            response.writeHead(200);
            response.end();

            break;

          case '/remove_from_queue':
            queueController.removeFromQueue(data.songID, data.userID, (error, newQueue) => {
              if (error) {
                response.writeHead(403);
                response.end(error);

                return; 
              }
              
              response.writeHead(200);
              response.end(JSON.stringify(newQueue));
            });

            break;
          
          default:
            response.writeHead(400);
            response.end("Bad User Request.");
            break;
        }
      });

      break;
    
    // Non User Endpoints
    case '/get_queue': 
      response.writeHead(200);
      response.end(JSON.stringify(queueController.getQueue()));
      
      break;
    
    case '/get_played': 
      response.writeHead(200);
      response.end(JSON.stringify(queueController.getPlayed()));
      
      break;

    default:
      response.writeHead(400);
      response.end("Bad Request.");
  }
}