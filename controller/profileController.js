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

    callback(null, songsFromResponse(response.items));
  })
}

function getFavoriteSongs(userID, callback) {
  spotifyRequest('GET', '/me/top/tracks?limit=12', null, userID, function(error, response) {
    if (error) {
      callback(error, null);
      return;
    }

    var songs = response.items.map((song) => {
      return {
        uri: song.uri,
        title: song.name,
        album: song.album.name,
        artist: song.artists.map((artist) => artist.name).join(',')
      }
    })

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
  spotifyRequest('GET', '/playlists/' + uri.split(':')[2] + "/tracks/", null, userID, function(error, response) {
    if (error) {
      console.log(error)
      callback(error, null);
      return;
    }

    console.log(response)
    
    callback(null, {
      songs: songsFromResponse(response.items),
      nextOffset: response.next
    });
  });
}

function songsFromResponse(items) {
  var songs = items.map((item) => {
    var song = item.track;
    
    return {
      uri: song.uri,
      title: song.name,
      album: song.album.name,
      artist: song.artists.map((artist) => artist.name).join(',')
    }
  });

  return songs;
}

module.exports = {
  getProfile,
  getSavedSongs,
  getFavoriteSongs,
  getPlaylists,
  getPlaylist
}