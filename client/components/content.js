const React = require('react');

const Browse = require('./browse')
const Fireplace = require('./fireplace')

module.exports = function(props) {
  switch(props.location) {
    case 'browse': 
      return <Browse userID={props.userID}></Browse>
      break;
    
    case 'fireplace': 
      return <Fireplace userID={props.userID}></Fireplace>
      break;
    
    default:
      return <h2>{props.location + "!"}</h2>
  }
}
