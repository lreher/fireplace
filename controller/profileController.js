const spotifyRequest = require('../services/spotifyRequest')

function getProfile(userID, callback) {
  spotifyRequest('GET', '/me', null, userID, function(error, response) {
    if (error) {
      callback(error, null);
      return;
    }

    callback(null, response);
  })
}

module.exports = {
  getProfile
}