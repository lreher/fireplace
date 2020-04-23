import React, { useState } from 'react';

const Queue = require('../shared/queue');
const Played = require('./played');

module.exports = function(props) {
  //const [playlistURI, setPlaylistURI] = useState('1');

  return <div className="fireplace">
    <div className="fireplace-devices"></div>
    <div className="fireplace-main">
      <Queue userID={props.userID} location="fireplace"></Queue>
      <Played userID={props.userID}></Played>
    </div>
    <div className="fireplace-users"></div>
  </div>
}
