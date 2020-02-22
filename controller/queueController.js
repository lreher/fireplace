var spotifyRequest = require('../services/spotifyRequest')
var deviceController = require('../controller/deviceController');

queue = [];

played = [];
playing = false;

canSkip = true;

function addToQueue(song) {
  queue.push(song)
}

function getQueue() {
  return queue;
}

function getPlayed() {
  return played;
}

function play(callback) {
  console.log("play")
  if (queue.length === 0) {
    callback("No songs in queue.", null)
    return;
  }

  if (playing == true) {
    played.push(queue.shift())
  }

  body = {
    uris: [queue[0].uri]
  }

  spotifyRequest('PUT', '/me/player/play?device_id=' + deviceController.getDevice(), body, function(error, response) {
    if (error) {
      callback(error, null)
      return;
    }

    playing = true;
    canSkip = true;

    callback(null, response.data)
  })

}

function start(callback) {
  setInterval(getPlayback, 10000)

  play(function(error, response) {
    if (error) {
      callback(error, null)
      return;
    }
    callback(null, response)
  })
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
  // Check if song has less than 20 seconds left, set a timeout to change songs.
  if (response.item.uri === queue[0].uri) {
    progress = response.item.duration_ms - response.progress_ms

    console.log(progress)

    if (progress < 20000 && canSkip) {
      canSkip = false;
      console.log("setting")
      setTimeout(play, progress - 1000)
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
