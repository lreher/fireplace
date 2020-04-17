import React, { useState } from 'react';


function changeCategory(setCategoryTitle, category) {
  setCategoryTitle(category)
}

module.exports = function(props) {
  const [categoryTitle, setCategoryTitle] = useState('Saved Songs');

  return <div class="browse">
    <div class='browse-categories'>
      <button class='browse-categories-button' onClick={() => changeCategory(setCategoryTitle, 'Saved Songs')}>Saved Songs</button>
      <button class='browse-categories-button' onClick={() => changeCategory(setCategoryTitle, 'Playlists')}>Playlists</button>
      <button class='browse-categories-button' onClick={() => changeCategory(setCategoryTitle, 'Favorite Songs')}>Favorite Songs</button>
    </div>
    <div class='browse-category'>
      <div class='browse-category-title'><h2>{categoryTitle}</h2></div>
    </div>
    <div class='browse-queue'></div>
  </div>
}
