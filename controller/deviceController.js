const spotifyRequest = require('../services/spotifyRequest')

function getDevices(userID, callback) {
  spotifyRequest("GET", "/me/player/devices", null, userID, function(error, response) {
    if(error) {
      callback(error, null)
      return;
    }

    callback(null, response.devices)
  })
}


module.exports = {
  getDevices
}