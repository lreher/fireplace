const React = require('react');


function changeCategory(category) {
  console.log(category);
}

module.exports = function(props) {
  return <div class="browse">
    <div class='browse-categories'>
      <button class='browse-categories-button' onClick={() => changeCategory('saved')}>Saved Songs</button>
      <button class='browse-categories-button' onClick={() => changeCategory('playlists')}>Playlists</button>
      <button class='browse-categories-button' onClick={() => changeCategory('favorites')}>Favorite Songs</button>
    </div>
    <div class='browse-category'></div>
    <div class='browse-queue'></div>
  </div>
}
