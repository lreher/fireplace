function getDevices() {
  spotifyRequest("GET", "/me/player/devices", null, userID, function(error, response) {
    if(error) {
      callback(error, null)
      return;
    }

    console.log(response);
    callback(null, [])
  })
}


module.exports = {
  getDevices
}