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

    fs.readFile(servePath, function(error, content) {
      response.writeHead(200, { 'Content-Type': 'text/html' })
      response.end(content, 'utf-8')
    })
  } else if (url === '/index.js') {
    // God I hope we dOnt UsE  C    S      S
    servePath = path.resolve(__dirname, "../client/static/index.js")

    fs.readFile(servePath, function(error, content) {
      response.writeHead(200, { 'Content-Type': 'text/json' })
      response.end(content, 'utf-8')
    })
  } else {
    // Clearly we shouln't take anything else into consideration
    song = url.replace(/(\/*%22)/g, '').replace(/(%20)/g, ' ')
    console.log(song)
    
    controller.requestToken(function(token) {
      console.log(token)
    })
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
}
