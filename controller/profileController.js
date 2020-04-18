const spotifyRequest = require('../services/spotifyRequest')

function getProfile(userID, callback) {
  spotifyRequest('GET', '/me', null, userID, function(error, response) {
    if (error) {
      callback(error, null);
      return;
    }

    callback(null, response);
  })
}

function getSavedSongs(userID, callback) {
  spotifyRequest('GET', '/me/tracks?limit=50', null, userID, function(error, response) {
    if (error) {
      callback(error, null);
      return;
    }

    var songs = response.items.map((item) => {
      var song = item.track;

      return {
        uri: song.uri,
        title: song.name,
        album: song.album.name,
        artist: song.artists.map((artist) => artist.name).join(',')
      }
    });

    callback(null, {
      name: "Your Songs",
      songs: songs
    });
  })
}

module.exports = {
  getProfile,
  getSavedSongs
}