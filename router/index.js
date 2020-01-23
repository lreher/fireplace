var Router = require('node-router')

module.exports = function() {
  var router = Router()

  router.push('GET', '.', routeHandler)

  return router
}

function routeHandler(req, res, next) {
  res.send("hi")
}
