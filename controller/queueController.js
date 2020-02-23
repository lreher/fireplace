var spotifyRequest = require('../services/spotifyRequest')
var deviceController = require('../controller/deviceController');

queue = [];

played = [];

playing = false;
canSkip = true;

function start(callback) {
  setInterval(getPlayback, 5000)
  setInterval(logState, 20000)

  play()

  callback(null, "Gottem")
}


function play() {
  if (queue.length === 0) {
    setTimeout(play, 3000)
    return;
  }

  song = queue[0]

  body = {
    uris: [song.uri]
  }

  spotifyRequest('PUT', '/me/player/play?device_id=' + deviceController.getDevice(), body, function(error, response) {
    if (error) {
      console.log("didn't play")
      setTimeout(play, 3000)
      return;
    }

    canSkip = true;
    console.log("played")
  })
}


function save(callback) {
  time = new Date(Date.now())

  body = {
    name: "Fireplace: " + time.toUTCString()
  }

  spotifyRequest('POST', "/users/" + deviceController.getUser()+ "/playlists", body, function(error, response) {
    if (error) {
      callback(error, null)
      return
    }

    body = {
      uris: played.map(song => song.uri)
    }

    spotifyRequest('POST', "/playlists/" + response.id + "/tracks", body, function(error, response) {
      if (error) {
        callback(error, null)
        return;
      }

      played = []
      callback(null, "Gottem")
    })
  })
}

function end(callback) {
  queue = [];
  played = [];

  deviceController.resetDevice()

  playing = false;
  canSkip = true;

  callback(null, "Gottem")
}

function next()  {
  if (queue.length > 0) {
    played.push(queue[0])
    queue.shift()
  }
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

    if (progress < 10000 && canSkip) {
      canSkip = false;

      setTimeout(next, progress - 2000)
      setTimeout(play, progress - 1500)
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
      return;
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

function clearQueue() {
  queue = [];
}

function addToQueue(song) {
  queue.push(song)
}

function getQueue() {
  return queue;
}

function getPlayed() {
  return played;
}

function logState() {
  console.log('Queued Songs: ' + queue)
  console.log('Played Songs: ' + played)
  console.log('User: ' +  deviceController.getUser())
  console.log('Device: ' +  deviceController.getDevice())
}

module.exports = {
  addToQueue: addToQueue,
  getQueue: getQueue,
  getPlayed: getPlayed,
  searchSongs: searchSongs,
  start: start,
  save: save,
  end: end
}
