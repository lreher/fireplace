//var SeaLion = require('sea-lion')
var fs = require('fs')
var path = require('path')
var controller = require('../controller')

var loggedIn = false
var accessToken;
var spotifyRedirect;

module.exports = function(request, response) {
  var url = request.url

  var servePath

  console.log(url)

  switch(url) {
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

    // TODO handle wildcard js
    case '/client.js':
      servePath = path.resolve(__dirname, "../client/js/client.js")

      response.writeHead(200, { 'Content-Type': 'text/json' })
      fs.createReadStream(servePath, 'utf-8').pipe(response)

      break;

    case '/player.js':
      servePath = path.resolve(__dirname, "../client/js/player.js")

      response.writeHead(200, { 'Content-Type': 'text/json' })
      fs.createReadStream(servePath, 'utf-8').pipe(response)

      break;

    case (url.match(/callback/) || {}).input:
      code = url.replace("/callback?code=", "")

      controller.authorize(code, function(error, authorization) {
        if (error) {
          response.writeHead(500);
          response.end("Failed to Authenticate to Spotify");
          return;
        }

        response.writeHead(302, { 'Location': 'player' })
        response.end();
      })

      break;

    case "/player":
      servePath = path.resolve(__dirname, "../client/html/player.html")

      response.writeHead(200, { 'Content-Type': 'text/html' })
      fs.createReadStream(servePath, 'utf-8').pipe(response)

      break;

    case "/devices":
      controller.getDevices(function(error, devices) {
        if (error) {
          response.writeHead(500);
          response.end("Failed to Get Devices.");
          return;
        }

        response.writeHead(200);
        response.end(JSON.stringify(devices));
      })

      break;

    case "/songs":
      var requestData = ""

      request.on('data', function(chunk) {
        requestData += chunk.toString()
      })
      .on('end', function() {
        song = requestData.replace('song=', '').replace(/\+/g, ' ')

        controller.getSongs(song, function(error, songs) {
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

    case "/play":
      var requestData = ""

      request.on('data', function(chunk) {
        requestData += chunk.toString()
      })
      .on('end', function() {
        playInfo = JSON.parse(requestData)

        controller.playSong(playInfo.deviceID, playInfo.songURI)
      })

      break;


    default:
      response.writeHead(400)
      response.end("Bad Request.")
  }
}
