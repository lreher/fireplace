var requestToken = require('../requests/requestToken')
var requestSongs = require('../requests/requestSongs')

function getSongs(query, token, callback) {
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
}

module.exports = {
  requestToken: requestToken,
  getSongs: getSongs
}
