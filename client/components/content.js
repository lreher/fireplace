const React = require('react');

const Browse = require('./browse')

module.exports = function(props) {
  switch(props.location) {
    case 'browse': 
      return <Browse userID={props.userID}></Browse>
      break;
    
    default:
      return <h2>{props.location + "!"}</h2>
  }
}
