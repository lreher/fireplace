const React = require('react');

const request = require('../utils/request');

module.exports = function(props) {
  return <div class="header">
    <div class="header-title"><h1>fireplace</h1></div>
    <div class="header-profile">
      <h1>{props.userName}</h1>
      <img class="header-profile-picture" src={props.photoURL}></img>
    </div>
  </div>
}
