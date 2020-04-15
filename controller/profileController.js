const spotifyRequest = require('../services/spotifyRequest')

function getProfile(userID, callback) {
  spotifyRequest('GET', '/me', null, userID, function(error, response) {
    if (error) {
      callback(error, null);
    }

    console.log(response)
  })
}

module.exports = {
  getProfile
}