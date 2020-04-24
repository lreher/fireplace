var queue = [];
var played = [];

function addToQueue(song) {
  queue.push(song);
  // if (playingIntermission) {
  //   play();
  // }
  return queue;
}

function getQueue() {
  return queue;
}

function removeFromQueue(songID, userID, callback) {
  var song = queue[songID];

  if (song.userID === userID) {
    queue.splice(songID, 1);
    callback(null, queue);
  } else {
    callback("You did not add this song!", null);
  }
}

function getPlayed() {
  return played;
}

module.exports = {
  addToQueue,
  getQueue,
  removeFromQueue,
  getPlayed
}