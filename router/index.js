//var SeaLion = require('sea-lion')
var fs = require('fs')
var path = require('path')
var controller = require('../controller')

var loggedIn = false

module.exports = function(request, response) {
  var url = request.url

  var servePath

  console.log(url)

  switch(url) {
    case '/':
      if (loggedIn) {
        servePath = path.resolve(__dirname, "../client/static/index.html")
      } else {
        servePath = path.resolve(__dirname, "../client/static/login.html")
      }

      response.writeHead(200, { 'Content-Type': 'text/html' })
      fs.createReadStream(servePath, 'utf-8').pipe(response)

      break;

    case '/index.js':
      servePath = path.resolve(__dirname, "../client/static/index.js")

      response.writeHead(200, { 'Content-Type': 'text/json' })
      fs.createReadStream(servePath, 'utf-8').pipe(response)

      break;

    case '/login':
      controller.login(function (error, response) {
        if (error) {
          response.writeHead(500);
          response.end("Failed to login to Spotify!");
          return;
        }

        console.log(response)
      })

      login = true
      break;

    case '/search':
      var song = ''

      request.on('data', function(chunk) {
        song += chunk.toString()
      }).on('end', function() {
        controller.getSongs(song, function(error, songs) {
          if (error) {
            response.writeHead(500);
            response.end("Failed to Search Songs From Spotify!");
            return;
          }

          response.writeHead(200)
          response.end(JSON.stringify(songs))
        })
      })

      break;

    default:
      response.writeHead(400)
      response.end("Bad Request.")
  }
}
