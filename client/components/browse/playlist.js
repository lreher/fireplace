import React, { useState } from 'react';

const Song = require('./song')

const request = require('../../utils/request');

var playlistURI = "0"
var hasSearchListener = false;
var loadedSongs = [];

function getPaginatedSongs(url, data, setSongs) {
  var dataObject = JSON.stringify({
    ...data,
    offset: 0
  })

  request('POST', url, dataObject, (error, response) => {
    if (error) {
      // handle edgy case
      return;
    }

    var responseObject = JSON.parse(response);
    var totalSongs = parseInt(responseObject.total);
    var totalRequests = Math.floor(totalSongs)/50;
    
    loadedSongs = responseObject.songs;
    setSongs(loadedSongs);

    // Download rest
    for (var i = 1; i <= totalRequests; i++) {
      var dataObject = JSON.stringify({
        ...data,
        offset: i * 50
      })
    
      request('POST', url, dataObject, (error, response) => {
        if (error) {
          return;
        }

        var responseObject = JSON.parse(response);

        loadedSongs = loadedSongs.concat(responseObject.songs)

        if (loadedSongs.length === totalSongs) {
          setSongs(loadedSongs)
        }
      });
    }
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
    getPaginatedSongs(url, data, setSongs)
  }
  
  playlistURI = props.uri;
  
  // Search listener
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
