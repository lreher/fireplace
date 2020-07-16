const React = require('react');

const Browse = require('./browse')
const Fireplace = require('./fireplace')
const Play = require('./play')


module.exports = function(props) {
  switch(props.location) {
    case 'browse': 
      return <Browse userID={props.userID}></Browse>
      break;
    
    case 'fireplace': 
      return <Fireplace userID={props.userID}></Fireplace>
      break;

    case 'play': 
      return <Play userID={props.userID}></Play>
      break;
    
    default:
      return <h2>{props.location + "!"}</h2>
  }
}
