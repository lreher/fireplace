import React, { useState, useEffect } from 'react';

const Song = require('../shared/song')

const request = require('../../utils/request');

var timeoutValue = 0;
var mounted = false;

module.exports = function(props) {
  const [songs, setSongs] = useState([]);

  var songID = -1;
  var songElements = songs.map((song) => {
    songID++;

    return <Song key={songID} songID={songID} location='fireplace' mode='add' userID={props.userID} song={song} refreshSongs={setSongs}></Song>
  })

  setTimeout(() => {
    timeoutValue = 1000;
    
    request('POST', 'https://fireplace.onrender.com/get_played', {}, (error, response) => {
      if (error) {
        return;
      }

      var responseObect = JSON.parse(response);
      
      if (mounted) {
        setSongs(responseObect);
      }
    })
  }, timeoutValue) 

  // Reset state on unmount
  useEffect(() => {
    mounted = true;
    return () => {
      timeoutValue = 0;
      mounted = false;
    }
  }, []);

  return <div className='fireplace-played'>
    <div className='fireplace-played-title'><h3>Played</h3></div>
    <div className='fireplace-songs'>
      {songElements}
    </div>
  </div>
}