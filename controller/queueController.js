var queue = [];

function addToQueue(song) {
  queue.push(song);

  // if (playingIntermission) {
  //   play();
  // }
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

module.exports = {
  addToQueue,
  getQueue,
  removeFromQueue
}