var requestToken = require('../services/requestToken')
var spotifyRequest = require('../services/spotifyRequest')

var accessToken;

function authorize(code, callback) {
 requestToken(code, function(error, response) {
   if (error) {
     callback(error, null)
   }

   accessToken = response.data.access_token
   callback(null, response)
 })
}

function getDevices(callback) {
  spotifyRequest("GET", "/me/player/devices", accessToken, function(error, response) {
    if(error) {
      callback(error, null)
    }

    callback(null, response)
  })
}

function playSong(callback) {
  spotifyRequest('PUT', 'me/player/play', accessToken, function(error, response) {
    if (error) {
      callback(error, null)
    }

    callback(null, response)
  })
}

function getSongs(callback) {
  var query = encodeURIComponent("test song")

  spotifyRequest("GET", '/search?q=' + query + '&type=track', accessToken, function(error, response) {
    if(error) {
      callback(error, null)
    }

    var responseItems = response.tracks.items
    var tracks = []

    for(var i = 0; i < responseItems.length; i++) {
      var track = responseItems[i];

      var artists = []

      for(var j = 0; j < track.artists.length; j++) {
        artists.push(track.artists[j].name)
      }

      tracks.push({
        id: track.id,
        name: track.name,
        duration_ms: track.duration_ms,
        album: track.album.name,
        artists: artists
      })
    }

    callback(null, tracks)
  })
}

module.exports = {
  authorize: authorize,
  getDevices: getDevices,
  getSongs: getSongs,
  playSong: playSong

}
