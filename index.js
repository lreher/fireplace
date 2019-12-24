require('dotenv').config()

var requestToken = require('./requests/requestToken')

token = requestToken(function (token) {
 console.log(token)
})
