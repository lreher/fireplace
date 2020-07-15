const React = require('react');

module.exports = function(props) {
  return <div className='nav'>
      <button className='nav-button' onClick={() => props.action('browse')}>Browse</button>
      <button className='nav-button' onClick={() => props.action('fireplace')}>Fireplace</button>
      <button className='nav-button' >Play</button>
    </div>
}
