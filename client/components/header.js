const React = require('react');

module.exports = function(props) {
  return <div class="header">
    <div class="header-title"><h1>fireplace</h1></div>
    <div class="header-profile"><h1>{props.userName}</h1></div>
  </div>
}
