import React, { useState } from 'react';

const Devices = require('./devices');
const Played = require('./played');

const Queue = require('../shared/queue');

module.exports = function(props) {
  //const [playlistURI, setPlaylistURI] = useState('1');

  return <div className="fireplace">
    <Devices userID={props.userID} location="fireplace"></Devices>
    <div className="fireplace-main">
      <Queue userID={props.userID} location="fireplace"></Queue>
      <Played userID={props.userID}></Played>
    </div>
    <div className="fireplace-users"></div>
  </div>
}
