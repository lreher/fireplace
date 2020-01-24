var http = require('http')
var createRouter = require('../router')

module.exports = function() {
  var router = createRouter()
  var server = http.createServer(router.createHandler())

  server.listen(8080)
}
