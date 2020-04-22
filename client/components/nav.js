const React = require('react');

module.exports = function(props) {
  return <div className='nav'>
      <button className='nav-button' onClick={() => props.action('browse')}>Browse</button>
      <button className='nav-button' onClick={() => props.action('search')}>Search</button>
      <button className='nav-button' onClick={() => props.action('fireplace')}>Fireplace</button>
      <button className='nav-button' onClick={() => props.action('player')}>Player</button>
      <button className='nav-button' onClick={() => props.action('recomender')}>Recomender</button>
    </div>
}
