import React, { useState } from 'react';

const Header = require('./header');

const request = require('../utils/request');

module.exports = function(props) {
  const [userName, setName] = useState('');

  if (props.userID) {
    request('GET', 'http://localhost:8081/me?userID=' + props.userID, {}, (error, response) => {
      // stored ID not longer in back-end  
      if (error) {
        return;
      }

      const userInfo = JSON.parse(response);
    
      setName(userInfo["display_name"]);
    })
  }

  return <div>
    <Header userName={userName}></Header>
    <div class="content">
       
    </div>
  </div>
}