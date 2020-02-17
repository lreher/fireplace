var fs = require('fs');
var path = require('path');

var authorizationController = require('../controller/authorizationController');
var deviceController = require('../controller/deviceController');
var queueController = require('../controller/queueController');


var queue = [];

module.exports = function(request, response) {
  var url = request.url

  var servePath

  console.log(url)

  switch(url) {
    // Main pages
    case '/':
      servePath = path.resolve(__dirname, "../client/html/login.html")

      response.writeHead(200, { 'Content-Type': 'text/html' })
      fs.createReadStream(servePath, 'utf-8').pipe(response)

      break;

    case '/client':
      servePath = path.resolve(__dirname, "../client/html/client.html")

      response.writeHead(200, { 'Content-Type': 'text/html' })
      fs.createReadStream(servePath, 'utf-8').pipe(response)

      break;

    case "/player":
      servePath = path.resolve(__dirname, "../client/html/player.html")

      response.writeHead(200, { 'Content-Type': 'text/html' })
      fs.createReadStream(servePath, 'utf-8').pipe(response)

      break;

    // Serve JS
    case (url.match(/[a-z].js/) || {}).input:
      servePath = path.resolve(__dirname, "../client/js" + url)

      response.writeHead(200, { 'Content-Type': 'text/json' })
      fs.createReadStream(servePath, 'utf-8').pipe(response)
      break;

    // Serve CSS
    case (url.match(/[a-z].css/) || {}).input:
      servePath = path.resolve(__dirname, "../client/css" + url)

      response.writeHead(200, { 'Content-Type': 'text/css' })
      fs.createReadStream(servePath, 'utf-8').pipe(response)
      break;

    // Spotify Redirect
    case (url.match(/callback/) || {}).input:
      code = url.replace("/callback?code=", "")

      authorizationController.authorize(code, function(error, authorization) {
        if (error) {
          response.writeHead(500);
          response.end("Failed to Authenticate to Spotify");
          return;
        }

        response.writeHead(302, { 'Location': 'player' })
        response.end();
      })

      break;

    case "/devices":
      deviceController.getDevices(function(error, devices) {
        if (error) {
          response.writeHead(500);
          response.end("Failed to Get Devices.");
          return;
        }

        response.writeHead(200);
        response.end(JSON.stringify(devices));
      })

      break;

    case "/set_device":
      var requestData = ""

      request.on('data', function(chunk) {
        requestData += chunk.toString()
      })
      .on('end', function() {
        deviceController.setDevice(requestData)

        response.writeHead(200);
        response.end();
      })

      break;

    case "/current_device":
      deviceID = deviceController.getDevice()

      if (!deviceID) {
        response.writeHead(404);
        response.end();
      }

      response.writeHead(200);
      response.end(deviceID);

      break;

    case "/search":
      var requestData = ""

      request.on('data', function(chunk) {
        requestData += chunk.toString()
      })
      .on('end', function() {
        var searchQuery = JSON.parse(requestData)

        queueController.searchSongs(searchQuery.song, searchQuery.album, searchQuery.artist, function(error, songs) {
          if (error) {
            response.writeHead(500);
            response.end("Failed to Get Songs.");
            return;
          }

          response.writeHead(200);
          response.end(JSON.stringify(songs));
        })
      })

      break;

    case "/add":
      var requestData = ""

      request.on('data', function(chunk) {
        requestData += chunk.toString()
      })
      .on('end', function() {
        queue.push(JSON.parse(requestData))

        response.writeHead(200);
        response.end(JSON.stringify(queue));
      })

      break;

    case "/songs":
      response.writeHead(200);
      response.end(JSON.stringify(queue));

      break;

    case "/play":
      var requestData = ""

      request.on('data', function(chunk) {
        requestData += chunk.toString()
      })
      .on('end', function() {
        playInfo = JSON.parse(requestData)

        queueController.playSong(deviceID, playInfo.songURI, function(error, response) {
          if (error) {
            response.writeHead(500);
            response.end("Failed to Play Song.");
            return;
          }
        })
      })

      break;


    default:
      response.writeHead(400)
      response.end("Bad Request.")
  }
}
