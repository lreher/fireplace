import React, { useState } from 'react';

const Song = require('./song')

const request = require('../../utils/request');

var playlistURI = "0"

module.exports = function(props) {
  var [songs, setSongs] = useState([]);

  if (playlistURI != props.uri) {
    switch (props.uri) {
      case '1':
        request('GET', "http://localhost:8081/saved_songs?userID=" + props.userID, {}, (error, response) => {
          if (error) {
            // handle edgy case
            return;
          }
      
          setSongs(JSON.parse(response));
        });
  
        break;
      
      default: 
        request('POST', "http://localhost:8081/playlist?userID=" + props.userID, props.uri, (error, response) => {
          if (error) {
            // handle edgy case
            return;
          }
      
          setSongs(JSON.parse(response));
        });
  
        break;
    }
  }
  
  playlistURI = props.uri;
  
  return <div class="browse-playlist">
    <div class="browse-playlist-title"><h3>{props.name}</h3></div>
    <div class="browse-songs">{songs.map((song) => {
      return <Song song={song}></Song>
    })}</div>
  </div>
}