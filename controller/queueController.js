var spotifyRequest = require('../services/spotifyRequest')

var queue = [];
var played = [];
var device = process.env.DEVICE_ID;
var userID;

canSkip = true;

var progress;

setInterval(getPlayback, 5000);

play();

function getPlayback() {
  spotifyRequest('GET', '/me/player', null, userID, function(error, response) {
    if (error) {
      return;
    }

    alterPlaybackState(response)
  })
}

function alterPlaybackState(playback) {
  // Check if song has less than 10 seconds left, set a timeout to change songs.
  if (playback.item.uri === queue[0].uri) {
    progress = playback.item.duration_ms - playback.progress_ms

    if (progress < 10000 && canSkip) {
      canSkip = false;

      setTimeout(next, progress - 2000);
      setTimeout(play, progress - 1500);
    }
  }
}

function next() {
  if (queue.length > 0) {
    played.push(queue[0]);
    queue.shift();
  }
}

function skip() {
  if (queue.length > 0) {
    queue.shift()
    play();
  }
}

function play() {
  if (queue.length === 0) {
    setTimeout(play, 3000);
    return;
  }

  song = queue[0];
  body = {
    uris: [song.uri]
  }

  spotifyRequest('PUT', '/me/player/play?device_id=' + device, body, userID, function(error, response) {
    if (error) {
      console.log("Failed to play.")
      setTimeout(play, 3000)
      return;
    }

    canSkip = true;
    console.log("Did do play.")
  })
}

function addToQueue(song) {
  queue.push(song);
 
  return queue;
}

function getQueue() {
  return queue;
}

function removeFromQueue(songID, userID, callback) {
  var song = queue[songID];

  queue.splice(songID, 1);

  // if (song.userID === userID) {
  //   queue.splice(songID, 1);
  //   callback(null, queue);
  // } else {
  //   callback("You did not add this song!", null);
  // }
}

function getPlayed() {
  return played;
}

function setUser(user) {
  userID = user;
}

function forcePlay() {
  play();
}

module.exports = {
  addToQueue,
  getQueue,
  removeFromQueue,
  getPlayed,
  setUser,
  forcePlay,
  skip
}