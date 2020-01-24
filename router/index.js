var SeaLion = require('sea-lion')

module.exports = function() {
  var router = new SeaLion({
    '/': function(request, response, token) {
      console.log(request)
    }
  })

  return router
}
