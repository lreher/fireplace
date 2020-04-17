const React = require('react');

module.exports = function(props) {
  return <div class='nav'>
      <button class='nav-button' onClick={() => props.action('browse')}>Browse</button>
      <button class='nav-button' onClick={() => props.action('search')}>Search</button>
      <button class='nav-button' onClick={() => props.action('fireplace')}>Fireplace</button>
      <button class='nav-button' onClick={() => props.action('player')}>Player</button>
      <button class='nav-button' onClick={() => props.action('recomender')}>Recomender</button>
    </div>
}
