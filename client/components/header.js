const React = require('react');

const request = require('../utils/request');

module.exports = function(props) {
  return <div className="header">
    <div className="header-title"><h1>fireplace</h1></div>
    <div className="header-profile">
      <h1>{props.userName}</h1>
      <img className="header-profile-picture" src={props.photoURL}></img>
    </div>
  </div>
}
