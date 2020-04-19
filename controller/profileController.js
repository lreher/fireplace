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

    callback(null, songs);
  })
}

function getPlaylists(userID, callback) {
  spotifyRequest('GET', '/me/playlists', null, userID, function(error, response) {
    if (error) {
      callback(error, null);
      return;
    }

    callback(null, response.items.map((playlist) => {
      return {
        name: playlist.name,
        uri: playlist.uri
      }
    }))
  })
}

function getPlaylist(userID, uri, callback) {
  spotifyRequest('GET', '/playlists/' + uri.split(':')[2], null, userID, function(error, response) {
    if (error) {
      callback(error, null);
      return;
    }

    var songs = response.tracks.items.map((item) => {
      var song = item.track;

      return {
        uri: song.uri,
        title: song.name,
        album: song.album.name,
        artist: song.artists.map((artist) => artist.name).join(',')
      }
    });

    callback(null, songs);
  })
}

module.exports = {
  getProfile,
  getProfilePhoto,
  getSavedSongs,
  getPlaylists,
  getPlaylist
}