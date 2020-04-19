import React, { useState } from 'react';

const Song = require('./song')

const request = require('../../utils/request');

var playlistURI = "0"

module.exports = function(props) {
  var [songs, setSongs] = useState([]);

  if (playlistURI != props.uri) {
    var url;
    var data;

    switch (props.uri) {
      case '1':
        url = "http://localhost:8081/saved_songs?userID=" + props.userID;
        data = {};
  
        break;
      
      case '2':
        url = "http://localhost:8081/favorite_songs?userID=" + props.userID;
        data = {};

        break;

      default: 
        url = "http://localhost:8081/playlist?userID=" + props.userID
        data = props.uri;
  
        break;
    }

    request('POST', url, data, (error, response) => {
      if (error) {
        // handle edgy case
        return;
      }

      var responseObject = JSON.parse(response)
      
      console.log(responseObject)
    });
  }
  
  playlistURI = props.uri;
  
  return <div class="browse-playlist">
    <div class="browse-playlist-title"><h3>{props.name}</h3></div>
    <div class="browse-songs">{songs.map((song) => {
      return <Song song={song}></Song>
    })}</div>
  </div>
}