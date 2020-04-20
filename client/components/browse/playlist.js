import React, { useState } from 'react';

const Song = require('./song')

const request = require('../../utils/request');

var playlistURI = "0"
var hasSearchListener = false;
var loadedSongs = [];

function getPaginatedSongs(url, data, offset, setSongs, songs) {
  var dataObject = JSON.stringify({
    ...data,
    offset: offset
  })

  request('POST', url, dataObject, (error, response) => {
    if (error) {
      // handle edgy case
      return;
    }

    var responseObject = JSON.parse(response);
    var nextOffset = parseInt(responseObject.nextOffset);
    
    var updatedSongs = songs.concat(responseObject.songs);

    loadedSongs = updatedSongs;

    // load first 50
    if (offset == 0) {
      setSongs(updatedSongs);
    }

    getPaginatedSongs(url, data, nextOffset, setSongs, updatedSongs);
  }); 
}

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
        data = { uri: props.uri };
  
        break;
    }
    getPaginatedSongs(url, data, 0, setSongs, songs)
  }
  
  playlistURI = props.uri;
    
  

  var input = document.getElementById('search-songs');

  if (input && hasSearchListener === false) {
    hasSearchListener = true;

    input.addEventListener("search", function (e) {
      if (e.target.value.length < 1) {
        setSongs(loadedSongs);
        return;
      }

      const search = new RegExp(e.target.value.toLowerCase());
      const newState = [];

      loadedSongs.map((song) => {
        const totalSong = (song.title + song.album + song.artist).toLowerCase();

        if (totalSong.match(search)) {
          newState.push(song);
        }
      })

      setSongs(newState);
    })
  }

  return <div class="browse-playlist">
    <div class="browse-playlist-title">
      <h3>{props.name}</h3>
      <input id="search-songs" class="browse-songs-search" type="search" placeholder="Search.."></input>
    </div>
    <div class="browse-songs">{songs.map((song) => {
      return <Song song={song}></Song>
    })}</div>
  </div>
}
