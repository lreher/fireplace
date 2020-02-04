require('dotenv').config()

var createServer = require('./server')

createServer()

// require('dotenv').config()
//
// var requestToken = require('./requests/requestToken')
// var searchSongs = require('./requests/searchSongs')
//
// token = requestToken(function (token) {
//  console.log(token)
//
//  searchSongs("hello", token, function(songs) {
//    console.log(songs)
//  })
// })
