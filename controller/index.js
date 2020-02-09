var requestToken = require('../services/requestToken')
var requestSongs = require('../services/requestSongs')
var requestLogin = require('../services/requestLogin')

function login(callback) {
 requestLogin(function(error, response) {
   if (error) {
     callback(error, null)
   }

   callback(null, response)
 })
}

function getSongs(query, callback) {

  // Get Access Token on App Start
  requestToken(function(error, token) {
    if (error) {
      response.writeHead(500);
      response.end("Failed Authorization with Spotify! Damn Gatekeepers.");
      return;
    }
    console.log(token)

    requestSongs(query, token, function(error, songResponse) {
      if(error) {
        callback(error, null)
      }

      var songs = []

      for (var songIndex = 0; songIndex < songResponse.length; songIndex++) {
        var artists = []

        for (var artistIndex = 0; artistIndex < songResponse[songIndex].artists.length; artistIndex++) {
          artists.push(songResponse[songIndex].artists[artistIndex].name)
        }

        songs.push({
          name: songResponse[songIndex].name,
          album: songResponse[songIndex].album.name,
          artists: artists,
          duration: songResponse[songIndex].duration_ms
        })
      }

      callback(null, songs)
    })
  })
}

module.exports = {
  login: login,
  getSongs: getSongs
}
