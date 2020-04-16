const React = require('react');

module.exports = function(props) {

  if (props.location == "Profile") {
    return <h2>Profile!</h2>
  } else {
    return <h2>Else</h2>
  }
   
}
