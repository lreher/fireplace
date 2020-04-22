import React, { useState } from 'react';

var timeoutValue = 0;

const Song = require('./song')

const request = require('../../utils/request');

var timeoutValue = 0;

module.exports = function(props) {
  const [songs, setSongs] = useState([]);

  var songID = -1;
  var songElements = songs.map((song) => {
    songID++;
    return <Song songID={songID} mode='remove' userID={props.userID} song={song} refreshSongs={setSongs}></Song>
  })

  timeoutValue = 0;

  setTimeout(() => {
    timeoutValue = 1000;
    
    request('POST', 'http://localhost:8081/get_queue', {}, (error, response) => {
      if (error) {
        return;
      }

      var responseObect = JSON.parse(response);
      
      setSongs(responseObect)
    })
  }, timeoutValue) 

  return <div class='browse-queue'>
    <div class='browse-queue-title'><h3>Queue</h3></div>
    <div class='browse-songs'>
      {songElements}
    </div>
  </div>
}