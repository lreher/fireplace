import React, { useState } from 'react';

const Playlists = require('./playlists')

function changeCategory(setCategoryTitle, setcategoryPlaylists, category) {
  setCategoryTitle(category)

  var playlists = [];

  switch (category) {
    case 'Saved Songs':
      playlists = [{
        name: "Songs",
        songs: [
          {
          title: "Title Test",
          album: "Album Test",
          artist: "Artist Test"
          },
          {
            title: "Another Test",
            album: "Another",
            artist: "Test"
          }
        ]
      }]
      break;
  }

  setcategoryPlaylists(playlists)
}

module.exports = function(props) {
  const [categoryTitle, setCategoryTitle] = useState('Saved Songs');
  const [categoryPlaylists, setcategoryPlaylists] = useState([]);

  return <div class="browse">
    <div class='browse-categories'>
      <button class='browse-categories-button' onClick={() => changeCategory(setCategoryTitle, setcategoryPlaylists,  'Saved Songs')}>Saved Songs</button>
      <button class='browse-categories-button' onClick={() => changeCategory(setCategoryTitle, setcategoryPlaylists, 'Playlists')}>Playlists</button>
      <button class='browse-categories-button' onClick={() => changeCategory(setCategoryTitle, setcategoryPlaylists, 'Favorite Songs')}>Favorite Songs</button>
    </div>
    <div class='browse-category'>
      <div class='browse-category-title'><h2>{categoryTitle}</h2></div>
      <Playlists playlists={categoryPlaylists}></Playlists>
    </div>
    <div class='browse-queue'></div>
  </div>
}
