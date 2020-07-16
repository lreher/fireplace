import React, { useState } from 'react';
const Played = require('../fireplace/played');

const request = require('../../utils/request');

function forcePlay() {
  request('GET', 'https://fireplace.onrender.com/force_play', {}, (error, response) => {
    if (error) {
      return;
    }

    console.log('hm')
  });
}

function skip() {
  request('GET', 'https://fireplace.onrender.com/skip', {}, (error, response) => {
    if (error) {
      return;
    }

    console.log('ah')
  });
}

module.exports = function(props) {
  return <div className="play">

    <div className="play-buttons">
      <button className='play-button' onClick={forcePlay}>Play</button>
      <button className='skip-button' onClick={skip}>Skip</button>
    </div>

    <Played userID={props.userID}></Played>
  </div>
}
