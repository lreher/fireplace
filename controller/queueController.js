var spotifyRequest = require('../services/spotifyRequest')
var deviceController = require('../controller/deviceController');

queue = [];
queueUpdated = false;

played = [];
playing = false;

function addToQueue(song) {
  queue.push(song)

  queueUpdated = true;
}

function getQueue() {
  return queue;
}

function getPlayed() {
  return played;
}

function play(callback) {
  playing = true;
  if (queue.length === 0) {
    callback("No songs in queue.", null)
    return;
  }

  body = {
    uris: [queue.shift()]
  }

  spotifyRequest('PUT', '/me/player/play?device_id=' + deviceController.getDevice(), body, function(error, response) {
    if (error) {
      callback(error, null)
      return;
    }

    queueUpdated = false;
    callback(null, response.data)
  })
}

function start() {
  play(function(error, response) {
    setInterval(queueTimer, 1000))
    setInterval(getPlayback, 10000)
  })
}

function queueTimer() {
  
}

function getPlayback() {
  spotifyRequest('GET', '/me/player', null, function(error, response) {
    if (error) {
      return;
    }

    alterPlaybackState(response)
  })
}

function alterPlaybackState(response) {
  console.log(response.progress_ms + " : " + response.item.duration_ms)
  console.log(response.item.uri)
  // Check if song has played to 80% completion, remove from queue and count it as played.
  if (response.item.uri === queue[0].uri) {
    if ((response.progress_ms / response.item.duration_ms) > 0.8) {
      console.log("song is d0ne")

      played.push(queue.shift())
    }
  }
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

  spotifyRequest("GET", '/search?q=' + query + '&type=track', null, function(error, response) {
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
  addToQueue: addToQueue,
  getQueue: getQueue,
  getPlayed: getPlayed,
  searchSongs: searchSongs,
  start: start
}
