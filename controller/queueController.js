var spotifyRequest = require('../services/spotifyRequest')
var deviceController = require('../controller/deviceController');

queue = [];
queueUpdated = false;

setInterval(getPlayback, 10000)

function addToQueue(song) {
  queue.push(song)
  queueUpdated = true;
}

function getQueue(song) {
  return queue;
}

function play(callback) {
  if (queue.length === 0) {
    callback("No songs in queue.", null)
    return;
  }
  //else if (queueUpdated === false) {
  //   resume(callback);
  //   return;
  // }

  body = {
    uris: queue.map(song => song.uri)
  }

  spotifyRequest('PUT', '/me/player/play?device_id=' + deviceController.getDevice(), body, function(error, response) {
    if (error) {
      callback(error, null)
      return;
    }

    queueUpdated = false;
    callback(null, response.data)
  })

  // transfer(function(error, response) {
  //   if (error) {
  //     console.log(error)
  //     return;
  //   }
//  })

}

function  getPlayback() {
  console.log('heyo')
  spotifyRequest('GET', '/me/player', null, function(error, response) {
    if (error) {
      console.log(error)
      return;
    }
    console.log(response)
  })
}

function transfer(callback) {
  body = {
    device_ids: [deviceController.getDevice()],
    play: true
  }

  spotifyRequest('PUT', '/me/player', body, function(error, response) {
    if (error) {
      callback(error, null)
      return;
    }
    callback(null, response)
  })
}

function resume(callback) {
  spotifyRequest('PUT', '/me/player/play?device_id=' + deviceController.getDevice(), {}, function(error, response) {
    if (error) {
      callback(error, null)
      return;
    }

    callback(null, response.data)
  })
}

function stop(callback) {
  spotifyRequest('PUT', '/me/player/pause', {}, function(error, response) {
    if (error) {
      callback(error, null)
      return;
    }

    callback(null,  response.data)
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
  searchSongs: searchSongs,
  play: play,
  resume: resume,
  stop: stop
}
