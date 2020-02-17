var spotifyRequest = require('../services/spotifyRequest')

var deviceID;

function getDevices(callback) {
  spotifyRequest("GET", "/me/player/devices", null, function(error, response) {
    if(error) {
      callback(error, null)
    }

    callback(null, response)
  })
}

function setDevice(_deviceID) {
  deviceID = _deviceID;
}

function getDevice() {
  return deviceID;
}

module.exports = {
  getDevices: getDevices,
  setDevice: setDevice,
  getDevice: getDevice,
}
