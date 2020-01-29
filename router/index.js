var SeaLion = require('sea-lion')

module.exports = function() {
  var router = new SeaLion({
    '/': function(request, response, token) {
      var body = []

      request.on('data', (chunk) => {
        body.push(chunk)
      }).on('end', () => {
        body = Buffer.concat(body).toString();

        response.end("fuck")
      })
    }
  })

  return router
}
