var spotifyRequest = require('../services/spotifyRequest')

var deviceID;
var userID;

function getDevices(callback) {
  spotifyRequest("GET", "/me/player/devices", null, function(error, response) {
    if(error) {
      callback(error, null)
      return;
    }

    callback(null, response)
  })
}

function setDevice(_deviceID) {
  deviceID = _deviceID;
  setUser()
}

function setUser() {
  spotifyRequest("GET", "/me/", null, function(error, response) {
    if (error)  {
      return;
    }

    userID = response.id
  })
}

function getUser() {
  return userID;
}

function getDevice() {
  return deviceID;
}

function resetDevice() {
  deviceID = null;
  userID = null;
}

module.exports = {
  getDevices: getDevices,
  setDevice: setDevice,
  getDevice: getDevice,
  resetDevice: resetDevice,
  getUser: getUser
}
