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
  spotifyRequest("GET", "/me/player/devices", null, accessToken, function(error, response) {
    if(error) {
      callback(error, null)
    }

    callback(null, response)
  })
}

function playSong(deviceID, songURI, callback) {
  body = {
    uris: [songURI]
  }

  spotifyRequest('PUT', '/me/player/play?device_id=' + deviceID, body, accessToken, function(error, response) {
    if (error) {
      console.log(error)
      callback(error, null)
    }

    console.log(response)
  })
}

function searchSongs(song, album, artist, callback) {
  var query = ''

  if (song) {
    query += 'track:' + encodeURIComponent(song) + '%20'
  }
  if (album) {
    query += 'album:' + encodeURIComponent(album) + '%20'
  }
  if (artist) {
    query += 'artist:' + encodeURIComponent(artist) + '%20'
  }

  console.log(query)

  spotifyRequest("GET", '/search?q=' + query + '&type=track', null, accessToken, function(error, response) {
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
        uri: track.uri,
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
  searchSongs: searchSongs,
  playSong: playSong
}
