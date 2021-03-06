const spotifyRequest = require('../services/spotifyRequest');
const queueController = require('./queueController');

function getProfile(userID, callback) {
  spotifyRequest('GET', '/me', null, userID, function(error, response) {
    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.display_name === "Lucas Reher") {
      queueController.setUser(userID);
    }
 
    callback(null, response);
  })
}

function getSavedSongs(userID, offset, callback) {
  var songs = {};

  spotifyRequest('GET', '/me/tracks?limit=50' + '&offset=' + offset, null, userID, function(error, response) {
    if (error) {
      callback(error, null);
      return;
    }

    callback(null, {
      songs: songsFromResponse(response.items),
      total: response.total
    });
  })
}

function getFavoriteSongs(userID, callback) {
  spotifyRequest('GET', '/me/top/tracks', null, userID, function(error, response) {
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

    callback(null, {
      songs: songs,
      total: 50
    });
  })
}

function getPlaylists(userID, callback) {
  spotifyRequest('GET', '/me/playlists', null, userID, function(error, response) {
    if (error) {
      callback(error, null);
      return;
    }

    console.log(userID);

    callback(null, response.items.map((playlist) => {
      return {
        name: playlist.name,
        uri: playlist.uri
      }
    }))
  })
}

function getPlaylist(userID, uri, offset, callback) {
  spotifyRequest('GET', '/playlists/' + uri.split(':')[2] + "/tracks?limit=50&offset=" + offset, null, userID, function(error, response) {
    if (error) {
      console.log(error)
      callback(error, null);
      return;
    }
    
    callback(null, {
      songs: songsFromResponse(response.items),
      total: response.total
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