import React, { useState } from 'react';

const Playlists = require('./playlists');
const Playlist = require('./playlist');

function changeCategory(state, uri, name) {
  state.setPlaylistName(name);
  state.setPlaylistURI(uri);
}

module.exports = function(props) {
  const [playlistURI, setPlaylistURI] = useState('1');
  const [playlistName, setPlaylistName] = useState('Your Songs');

  const state = {
    setPlaylistURI,
    setPlaylistName
  }

  return <div class="browse">
    <Playlists userID={props.userID} action={changeCategory} state={state}></Playlists>
    <Playlist userID= {props.userID} uri={playlistURI} name={playlistName}></Playlist>
    <div class='browse-queue'></div>
  </div>
}
