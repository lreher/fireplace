import React, { useState, useEffect } from 'react';

const Song = require('./song')

const request = require('../../utils/request');

var timeoutValue = 0;
var mounted = false;
var firstLoad = true;

module.exports = function(props) {
  const [songs, setSongs] = useState([]);

  var songID = -1;
  var songElements = songs.map((song) => {
    songID++;
    console.log(song)
    return <Song key={songID} songID={songID} location={props.location} mode='remove' userID={props.userID} song={song} refreshSongs={setSongs}></Song>
  })

  request('POST', 'http://localhost:8081/get_queue', {}, (error, response) => {
    if (error) {
      return;
    }

    var responseObject = JSON.parse(response);
    
    if (firstLoad) {
      firstLoad = false;

      Song({
        song: { title: "h", album: "a", artists: "h" },
        refreshSongs: setSongs
      })
      
      setSongs(responseObject)

      setTimeout(() => {
        setSongs(responseObject)
      }, 500)
    }
  })

  // Reset state on unmount
  useEffect(() => {
    mounted = true;
    return () => {
      firstLoad = true;
      timeoutValue = 0;
      mounted = false;
    }
  }, []);

  return <div className={props.location + '-queue'}>
    <div className={props.location + '-queue-title'}><h3>Queue</h3></div>
    <div className={props.location + '-songs'}>
      {songElements}
    </div>
  </div>
}