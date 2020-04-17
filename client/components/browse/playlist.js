const React = require('react');

const Song = require('./song')

module.exports = function(props) {
  var songs = props.songs.map((song) => {
   return <Song song={song}></Song>
  })

  return <div class="browse-playlist">
    <div class="songs">{songs}</div>
  </div>
}