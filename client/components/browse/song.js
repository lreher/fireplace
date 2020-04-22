const React = require('react');

module.exports = function(props) {
  return <div class="browse-song">
    <div class="browse-song-cell"><h4>{props.song.title}</h4></div>
    <div class="browse-song-cell"><h4>{props.song.album}</h4></div>
    <div class="browse-song-cell"><h4>{props.song.artist}</h4></div>
    <div><button class="browse-song-cell-button">Add</button></div>
  </div>
}