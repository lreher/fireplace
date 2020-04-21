import React, { useState } from 'react';

const request = require('../../utils/request');

module.exports = function(props) {
  const [playlists, setPlaylists] = useState([]);

  if (playlists.length == 0) {
    request('GET', 'https://fireplace.onrender.com/playlists?userID=' + props.userID, {}, (error, response) => {
      if (error) {
        // handle edgy case
        return;
      }

      setPlaylists([{
        name: "Your Songs",
        uri: '1'
      }, {
        name: "Favorite Songs",
        uri: '2'
      }].concat(JSON.parse(response)));
    });
    
    setPlaylists([{
      name: "Your Songs",
      uri: '1'
    }, {
      name: "Favorite Songs",
      uri: '2'
    }]);
  }
 
  return <div class='browse-playlists'>
    {playlists.map((playlist) => {
      return <button class='browse-playlists-button' onClick={() => props.action(props.state, playlist.uri, playlist.name)}>{playlist.name}</button>
    })}
  </div>
}