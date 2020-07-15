import React, { useState } from 'react';

const Playlists = require('./playlists');
const Playlist = require('./playlist');
const Queue = require('../shared/queue');

function changeCategory(state, uri, name) {
  state.setPlaylistName(name);
  state.setPlaylistURI(uri);
}

module.exports = function(props) {
  const [playlistURI, setPlaylistURI] = useState('1');
  const [playlistName, setPlaylistName] = useState('Favorite Songs');

  const state = {
    setPlaylistURI,
    setPlaylistName 
  } 

  return <div className="browse">
    <Playlists userID={props.userID} action={changeCategory} state={state}></Playlists>
    <Playlist userID={props.userID} uri={playlistURI} name={playlistName}></Playlist>
    {/* <Queue userID={props.userID} location="browse"></Queue> */}
  </div>
}
