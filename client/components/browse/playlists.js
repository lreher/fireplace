import React, { useState, useEffect } from 'react';

const request = require('../../utils/request');

var mounted = false;

module.exports = function(props) {
  const [playlists, setPlaylists] = useState([]);

  if (playlists.length == 0) {
    request('GET', 'http://localhost:8081/playlists?userID=' + props.userID, {}, (error, response) => {
      if (error) {
        // handle edgy case
        return;
      }

      if (mounted) {
        setPlaylists([{
          name: "Your Songs",
          uri: '1'
        }, {
          name: "Favorite Songs",
          uri: '2'
        }].concat(JSON.parse(response)));
      }
    });
    
    setPlaylists([{
      name: "Your Songs",
      uri: '1'
    }, {
      name: "Favorite Songs",
      uri: '2'
    }]);
  }

  // Reset state on unmount
  useEffect(() => {
    mounted = true;
    return () => {
      mounted = false;
    }
  }, []);
 
  var key = 0;
  return <div className='browse-playlists'>
    {playlists.map((playlist) => {
      key += 1;
      return <button key={key} className='browse-playlists-button' onClick={() => props.action(props.state, playlist.uri, playlist.name)}>{playlist.name}</button>
    })}
  </div>
}