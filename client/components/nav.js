const React = require('react');

module.exports = function(props) {
  return <div class='nav'>
      <button onClick={() => props.action('Profile')}>Profile</button>
      <button onClick={() => props.action('else')}>Else</button>
    </div>
}
