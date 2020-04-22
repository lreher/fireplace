const React = require('react');

const request = require('../../utils/request');

function addToQueue(userID, song) {
  var addData = JSON.stringify({
    song: {
      ...song,
      userID: userID
    }
  });

  request('POST', 'http://localhost:8081/add_to_queue?userID=' + userID, addData, (error, response) => {
    // handle animation success/fail
  });
}


function removeFromQueue(userID, songID, refreshSongs) {
  var removeData = JSON.stringify({
    songID: songID,
    userID: userID
  });

  request('POST', 'http://localhost:8081/remove_from_queue?userID=' + userID, removeData, (error, response) => {
    if (error) {
      alert(error.responseText)
      return;
    }

    refreshSongs(JSON.parse(response));
  });
}

module.exports = function(props) {
  var button; 
  
  if (props.mode === "add") {
    button = <button class="browse-song-cell-button" onClick={() => addToQueue(props.userID, props.song)}>Add</button>
  } else {
    button = <button class="browse-song-cell-button" onClick={() => removeFromQueue(props.userID, props.songID, props.refreshSongs)}>Remove</button>
  }
  
  return <div class="browse-song">
    <div class="browse-song-cell"><h4>{props.song.title}</h4></div>
    <div class="browse-song-cell"><h4>{props.song.album}</h4></div>
    <div class="browse-song-cell"><h4>{props.song.artist}</h4></div>
    <div>{button}</div>
  </div>
}