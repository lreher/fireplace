import React, { useState, useEffect } from 'react';

const request = require('../../utils/request');

var mounted = false;
var firstLoad = true;

module.exports = function(props) {
  const [devices, setDevices] = useState([]);

  request('GET', 'http://localhost:8081/get_devices?userID=' + props.userID, {}, (error, response) => {
    if (error) {
      return;
    }

    var responseObject = JSON.parse(response);
    
    if (firstLoad) {
      firstLoad = false;
      setDevices(responseObject)
    }

    setTimeout(() => {
      setDevices(responseObject)
    }, 2000)
  })
  
  // Reset state on unmount
  useEffect(() => {
    mounted = true;
    return () => {
      firstLoad = true;
      mounted = false;
    }
  }, []);

  var key = 0;
  return <div className="fireplace-devices">
  <h3>Add a Device</h3>
  {devices.map((device) => {
    key += 1;
    return <button key={key} className='fireplace-devices-button' onClick={() => console.log(device)}>{device.name}</button>
  })}
  </div>
}
