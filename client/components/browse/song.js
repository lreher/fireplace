const React = require('react');

module.exports = function(props) {
  return <div class="browse-song">
    <h4>{props.song.title}</h4>
    <h4>{props.song.album}</h4>
    <h4>{props.song.artist}</h4>
  </div>
}