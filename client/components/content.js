const React = require('react');

module.exports = function(props) {

  if (props.location == "Profile") {
    return <h1>Profile!</h1>
  } else {
    return <h1>Else</h1>
  }
   
}
