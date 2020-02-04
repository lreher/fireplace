//var SeaLion = require('sea-lion')
var fs = require('fs')
var path = require('path')
var controller = require('../controller')

module.exports = function(request, response) {
  var url = request.url
  console.log(url)

  var servePath

  if (url === '/') {
    servePath = path.resolve(__dirname, "../client/static/index.html")

    response.writeHead(200, { 'Content-Type': 'text/html' })
    fs.createReadStream(servePath, 'utf-8').pipe(response)
  }
  else if (url === '/index.js') {
    // God I hope we dOnt UsE  C    S      S
    servePath = path.resolve(__dirname, "../client/static/index.js")

    response.writeHead(200, { 'Content-Type': 'text/json' })
    fs.createReadStream(servePath, 'utf-8').pipe(response)
  }
  else if (url === '/search') {
    // Clearly we shouln't take anything else into consideration
    //song = url.replace(/(\/*%22)/g, '').replace(/(%20)/g, ' ')
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
        //console.log(songs)

        response.writeHead(200)
        response.end(JSON.stringify(songs))
      })
    })
  }
}


  // COMPLETELLY USELESS

  //console.log(request.url)
  // fs.readFile('../client/static/index.html')
  //
  // var router = new SeaLion({
  //   '/': function(request, response, token) {
  //     var body = []
  //
  //     request.on('data', (chunk) => {
  //       body.push(chunk)
  //     }).on('end', () => {
  //       body = Buffer.concat(body).toString();
  //
  //       response.end("fuck")
  //     })
  //   }
  // })
  //
  // return router
