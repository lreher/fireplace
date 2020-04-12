require('dotenv').config()

var createServer = require('./server')
var router = require('./router')

createServer(router)