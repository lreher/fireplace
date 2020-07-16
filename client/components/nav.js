const React = require('react');
const request = require('../utils/request');

function forcePlay() {
  console.log('hm')
  request('GET', 'http://localhost:8081/force_play', {}, (error, response) => {
    if (error) {
      return;
    }
  });
}

module.exports = function(props) {
  return <div className='nav'>
      <button className='nav-button' onClick={() => props.action('browse')}>Browse</button>
      <button className='nav-button' onClick={() => props.action('fireplace')}>Fireplace</button>
      <button className='nav-button' onClick={forcePlay}>Play</button>
    </div>
}
