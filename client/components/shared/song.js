const React = require('react');

const request = require('../../utils/request');

var alterQueue;

function addToQueue(userID, song) {
  var addData = JSON.stringify({
    song: {
      ...song,
      userID: userID
    }
  });

  request('POST', 'https://fireplace.onrender.com/add_to_queue?userID=' + userID, addData, (error, response) => {
    if (error) {
      alert("Failed to add song to Queue")
      return;
    }

    if (alterQueue) {
      alterQueue(JSON.parse(response))
    }
  });
}


function removeFromQueue(userID, songID) {
  var removeData = JSON.stringify({
    songID: songID,
    userID: userID
  });

  request('POST', 'https://fireplace.onrender.com/remove_from_queue?userID=' + userID, removeData, (error, response) => {
    if (error) {
      alert(error.responseText)
      return;
    }

    if (alterQueue) {
      alterQueue(JSON.parse(response))
    }
  });
}

module.exports = function(props) {
  var button;
  
  if (props.refreshSongs) {
    alterQueue = props.refreshSongs;
  }
  
  if (props.mode === "add") {
    button = <button className={props.location + "-song-cell-button"} onClick={() => addToQueue(props.userID, props.song)}>Add</button>
  } else {
    button = <button className={props.location + "-song-cell-button"} onClick={() => removeFromQueue(props.userID, props.songID)}>Remove</button>
  }
  
  return <div className={props.location + "-song"}>
    <div className={props.location + "-song-cell"}><h4>{props.song.title}</h4></div>
    <div className={props.location + "-song-cell"}><h4>{props.song.album}</h4></div>
    <div className={props.location + "-song-cell"}><h4>{props.song.artist}</h4></div>
    <div>{button}</div>
  </div>
}