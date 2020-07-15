import React, { useState } from 'react';

const Header = require('./header');
const Nav = require('./nav');
const Content = require('./content');

const request = require('../utils/request');

module.exports = function(props) {
  const [userName, setName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [location, setLocation] = useState('fireplace')

  if (props.userID) {
    request('GET', 'https://fireplace.onrender.com/me?userID=' + props.userID, {}, (error, response) => {
      // stored ID not longer in back-end  
      if (error) {
        return;
      }

      const userInfo = JSON.parse(response);
    
      setName(userInfo["display_name"]);
      setPhotoURL(userInfo["images"][0]["url"])
    })
  }

  return <div>
    <Header userName={userName} photoURL={photoURL}></Header>
    <Nav action={setLocation}></Nav>
    <Content location={location} userID={props.userID}></Content>
  </div>
}