const React = require('react');

const request = require('../../utils/request');

module.exports = function(props) {
  request('GET', "http://localhost:8081/profile_photo", props.url, (error, response) => {
    if (error) {
      // handle edgy case
      return;
    }

    console.log(response);
  });

  return <div class="header">
    <div class="header-title"><h1>fireplace</h1></div>
    <div class="header-profile">
      <h1>{props.userName}</h1>
    </div>
  </div>
}
