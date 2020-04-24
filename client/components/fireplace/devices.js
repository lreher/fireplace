import React, { useState } from 'react';

const request = require('../../utils/request');

module.exports = function(props) {
  const [devices, setDevices] = useState('1');

  // request('POST', 'http://localhost:8081/get_queue', {}, (error, response) => {
  //   if (error) {
  //     return;
  //   }

  //   var responseObject = JSON.parse(response);
    
  //   if (firstLoad) {
  //     firstLoad = false;
  //     setSongs(responseObject)

  //     setTimeout(() => {
  //       setSongs(responseObject)
  //     }, 500)
  //   }
  // })

  return <div className="fireplace-devices">
    
  </div>
}
