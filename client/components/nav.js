const React = require('react');

module.exports = function(props) {
  return <div class='nav'>
      <button class='nav-button' onClick={() => props.action('Profile')}>Profile</button>
      <button class='nav-button' onClick={() => props.action('Fireplace')}>Fireplace</button>
      <button class='nav-button' onClick={() => props.action('Player')}>Player</button>
      <button class='nav-button' onClick={() => props.action('Recomender')}>Recomender</button>
    </div>
}
