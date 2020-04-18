import React, { useState } from 'react';

const Playlists = require('./playlists')
const request = require('../../utils/request')

function changeCategory(userID, state, category) {
  state.setCategoryTitle(category)

  var playlists = [];

  switch (category) {
    case 'Saved Songs':
      request('GET', "http://localhost:8081/saved_songs?userID=" + userID, {}, (error, response) => {
        if (error) {
          // handle edgy case
          return;
        }

        console.log(response);
      });

      break;
  }

  setcategoryPlaylists(playlists)
}

module.exports = function(props) {
  const [categoryTitle, setCategoryTitle] = useState('Saved Songs');
  const [categoryPlaylists, setCategoryPlaylists] = useState([]);

  const state = {
    setCategoryTitle,
    setCategoryPlaylists
  }

  return <div class="browse">
    <div class='browse-categories'>
      <button class='browse-categories-button' onClick={() => changeCategory(props.userID, state, 'Saved Songs')}>Saved Songs</button>
      <button class='browse-categories-button' onClick={() => changeCategory(props.userID, state, 'Playlists')}>Playlists</button>
      <button class='browse-categories-button' onClick={() => changeCategory(props.userID, state, 'Favorite Songs')}>Favorite Songs</button>
    </div>
    <div class='browse-category'>
      <div class='browse-category-title'><h2>{categoryTitle}</h2></div>
      <Playlists playlists={categoryPlaylists}></Playlists>
    </div>
    <div class='browse-queue'></div>
  </div>
}
